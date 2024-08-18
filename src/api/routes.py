"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Pizza, Order, OrderItems, Ingredient, PizzaIngredient
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from flask_cors import CORS
import cloudinary
from cloudinary.uploader import upload
from flask_bcrypt import check_password_hash, generate_password_hash
from collections import defaultdict

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api)
cloudinary.config(
    cloud_name = "didd1mjsp",
    api_key= "939219197872851",
    api_secret = "tIZi6_K2YdSLcvDLNAkLY_XcipU"
)
    
@api.route('/users', methods = ['GET'])
@jwt_required()
def get_users(): 
    users = User.query.all()
    users_serialized = list(map(lambda item:item.serialize(), users))
    response_body = {
        "message" : "Nice!",
        "data": users_serialized
    }
    if (users == []):
        return jsonify({"msg": "Not users yet"}), 404
    return jsonify(response_body), 200

@api.route('/users/user/<int:user_id>', methods = ['GET'])
@jwt_required()
def get_user(user_id): 
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"msg": "User not found"}), 404
    user_info = User.query.filter_by(id=user_id).first().serialize()    
    response_body = {
        "message" : "Nice!",
        "data": user_info
    }
    return jsonify(response_body), 200


@api.route('/users/login', methods=['POST'])
def login():
    password = request.json.get('password')
    email = request.json.get('email')
    users_query = User.query.filter_by(email=email).first()
    print(users_query)
    if users_query == None:
        return jsonify({"msg": "Bad email or password"}), 402
    
    is_valid = check_password_hash(users_query.password, password)
    if is_valid is False:
        return jsonify({"msg": "Bad email or password"}), 401

    if is_valid is True:
        additional_claims = {
            "user_id" : users_query.id,
            "user_lastname" : users_query.lastname,
            "user_role" : users_query.role.value
        }
        
        access_token = create_access_token(identity=users_query.id, additional_claims=additional_claims, expires_delta=False)
        return jsonify(access_token=access_token, users= users_query.serialize()), 200
    return jsonify({"msg": "Bad email or password"}), 401


@api.route('/users/register', methods=['POST'])
def register():
    request_body = request.get_json()
    if User.query.filter_by(email=request_body["email"]).first():
        return jsonify({"msg": "Email already exists"}), 409
   
    encriptedPassword = generate_password_hash(request_body["password"]).decode('utf-8')
    user = User()
    user.new_user(
        email = request_body["email"],    
        password = encriptedPassword,
        lastname = request_body["lastname"],
        firstname = request_body["firstname"],
        role = request_body["role"]
    )
    additional_claims = {
        "user_id" : user.id,
        "user_lastname" : user.lastname,
        "role" : user.role.value
    }

    access_token = create_access_token(identity=request_body["email"], additional_claims=additional_claims, expires_delta=False)
    return jsonify(access_token=access_token, user=user.serialize()), 200

@api.route('/users/requestResetPassword', methods=['POST'])
def requestResetPassword():
    request_body = request.get_json()
    email = request_body["email"]

    if User.query.filter_by(email=request_body["email"]).first():
        token  = create_access_token(identity=request_body["email"]) 
        sender_email = "liina.hp96@gmail.com"
        receiver_email = email
        subject = "Recuperar contraseña"
        html = """\
        <html>
        <body>
            <p>Hi,<br>
            Haz click aqui para recuperar tu contraseña
            <a style="color: red" href="https://upgraded-guide-9r4pgx45v5p3x4pr-3000.app.github.dev/users/resetPassword?token=""" + token +"""" target="_blank" style="color: #ffffff; text-decoration: none; font-weight: bold;">Recuperarla!</a>
                </td>
            </tr>
        </table>
        </body>
        </html>
        """

        # Create a multipart message and set headers
        message = MIMEMultipart()
        message["From"] = "liina.hp96@gmail.com"
        message["To"] = email
        message["Subject"] = subject

        # Attach the HTML part
        message.attach(MIMEText(html, "html"))
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login('liina.hp96@gmail.com', 'vbgy jjul uxwg mkeh')
            server.sendmail(
                sender_email,receiver_email, message.as_string()
            )
        return jsonify("Sent"), 200
    else:
        return jsonify("NotSent"), 400

@api.route('/users/resetPassword', methods=['PATCH'])
@jwt_required()
def resetPassword():
    request_body = request.get_json()
    newPassword = request_body["password"]
    encriptedPassword = generate_password_hash(newPassword).decode('utf-8')
    user_email = get_jwt_identity()
    users_query = User.query.filter_by(email=user_email).first()
    users_query.password = encriptedPassword
    db.session.commit()
    return jsonify({"msg": "Good"}) , 200

@api.route('/users/delete/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    jtw_data = get_jwt()
    user_role = jtw_data["user_role"]
    if user_role=="Admin":
        user = User.query.get(user_id)
        if user:
            User.query.filter_by(id=user_id).delete()
            db.session.delete(user)
            db.session.commit()
            return jsonify({"msg": "User deleted"}), 200
        else:
            return jsonify({"msg": "User doesn't exist"}), 401
    return jsonify({"msg": "You need to be an Admin"}), 410
    
@api.route('/pizzas', methods = ['POST'])
def get_pizzas(): 
    request_body = request.get_json()
    if request_body == {} or request_body["ingredients"] == []:
        pizzas = Pizza.query.all()
        pizzas_serialized = list(map(lambda item:item.serialize(), pizzas))
        response_body = {
            "message" : "Nice pizzas!",
            "data": pizzas_serialized
        }
        if (pizzas == []):
            return jsonify({"msg": "Not pizzas yet"}), 404
        return jsonify(response_body), 200
    else:
        pizzas = Pizza.query.all()
        pizzas_serialized = list(map(lambda item:item.serialize(), pizzas))
        ingredients = request_body["ingredients"]
        pizzaRelation = PizzaIngredient.query.all()
        pizzasRelation_serialized = list(map(lambda item:item.serialize(), pizzaRelation))
        final = []
        for ingredient in ingredients:
            result = list(filter(lambda obj: obj['ingredient_id'] == int(ingredient), pizzasRelation_serialized))
            final.extend(result)

        pizza_count = {}
        for pizza in final:
            pizza_id = pizza['pizza_id']
            if pizza_id in pizza_count:
                pizza_count[pizza_id] += 1
            else:
                pizza_count[pizza_id] = 1

        somaething= []
        for pizza_id_final, times in pizza_count.items():
            if times == len(ingredients):
                somaething.append(pizza_id_final)

        data = []
        for pizz_id in somaething:
            result2 = list(filter(lambda obj: obj['id'] == pizz_id, pizzas_serialized))
            data.extend(result2) 
                   
        return jsonify({
            "message" : "Nice pizzas!",
            "data": data
        }), 200

@api.route('/pizzas/create', methods=['POST'])  
@jwt_required()  
def add_pizza():
    jtw_data = get_jwt()
    user_role = jtw_data["user_role"]
    if user_role=="Admin":
        file = request.files['file']
        if file.filename == '':
            return jsonify({"msg" : "No selected file"}), 404
        if Pizza.query.filter_by(name=request.form["name"]).first():
            return jsonify({"msg": "Duplicated pizza"}), 409
        try:
            result = upload	(file)
            pizza = Pizza()
            pizza.new_pizza(   
                name = request.form["name"],
                url = result['url'],
                price = request.form["price"],
                description = request.form["description"],
                pizza_type = request.form["pizza_type"]
            )
            db.session.add(pizza)
            db.session.commit()
            return jsonify({"msg": "Pizza created", "pizza": pizza.serialize()}),201
        except Exception as e:
            return jsonify({"error" : str(e)}) , 410
    return jsonify({"msg": "You need to be an Admin"}), 410
    

@api.route('/pizzas/pizza/<int:pizza_id>', methods = ['GET'])
def get_pizza(pizza_id): 
    pizza = Pizza.query.get(pizza_id)
    if pizza is None:
        return jsonify({"msg": "Pizza not found"}), 404
        
    pizza_info = Pizza.query.filter_by(id=pizza_id).first().serialize()
    response_body = {
        "message" : "Nice pizza!",
        "data": pizza_info
    }

    return jsonify(response_body), 200

@api.route('/pizzas/delete/<int:pizza_id>', methods=['DELETE'])
@jwt_required()
def delete_pizza(pizza_id):
    jtw_data = get_jwt()
    user_role = jtw_data["user_role"]
    if user_role=="Admin":
        pizza = Pizza.query.get(pizza_id)
        if pizza:
            Pizza.query.filter_by(id=pizza_id).delete()
            db.session.delete(pizza)
            db.session.commit()
            return jsonify({"msg": "Pizza deleted"}), 200
        else:
            return jsonify({"msg": "Pizza doesn't exist"}),401
    return jsonify({"msg": "You need to be an Admin"}), 410

@api.route('/orders', methods = ['GET'])
@jwt_required()
def get_orders(): 
    orders = Order.query.all()
    orders_serialized = list(map(lambda item:item.serialize(), orders))
    jtw_data = get_jwt()
    user_id = jtw_data["user_id"]
    response_body = {
        "message" : "ok!",
        "data": orders_serialized,
        "user_id": user_id
    }
    if (get_orders == []):
        return jsonify({"msg": "Not orders yet"}), 404
    return jsonify(response_body), 200


@api.route('/orders/order/<int:order_id>', methods = ['GET'])
@jwt_required()
def get_order(order_id): 
    order = Order.query.get(order_id)
    if order is None:
        return jsonify({"msg": "Order not found"}), 404
        
    order_info = Order.query.filter_by(id=order_id).first().serialize()    
    response_body = {
        "message" : "ok!",
        "data": order_info
    }

    return jsonify(response_body), 200

@api.route('/orders/create', methods=['POST'])
@jwt_required()
def new_order():
    request_body = request.get_json()
    jtw_data = get_jwt()
    user_id = jtw_data["user_id"]
    print(user_id)
    if Order.query.filter_by(user_id=user_id,  status="pending").first():
        return jsonify({"msg": "Duplicated order"}), 409
    order = Order()
    order.new_order(
        status= request_body["status"],
        payment_method = request_body["payment_method"],
        user_id= user_id
    )
    db.session.add(order)
    db.session.commit()
    return jsonify({"msg": "Order created", "order": order.serialize()}), 201

@api.route('/orders/checkout/<int:order_id>', methods=['PATCH'])
@jwt_required()
def proceedCheckout(order_id):
    order = Order.query.filter_by(id=order_id).first()
    order.status = "completed"
    db.session.commit()
    return jsonify({"msg": "Good"}) , 200

@api.route('/orders/delete/<int:order_id>', methods=['DELETE'])
@jwt_required()
def delete_order(order_id):
    jtw_data = get_jwt()
    user_role = jtw_data["user_role"]
    if user_role=="Admin":
        order = Order.query.get(order_id)
        if order:
            Order.query.filter_by(id=order_id).delete()
            db.session.delete(order)
            db.session.commit()
            return jsonify({"msg": "Order deleted"}), 200
        else:
            return jsonify({"msg": "Order doesn't exist"}), 401
    return jsonify({"msg": "You need to be an Admin"}), 410
    
@api.route('/orderitems/create', methods=['POST'])
@jwt_required()
def new_order_item():
    request_body = request.get_json()
    if not request_body:
        return jsonify({"msg": "Not found"}), 404

    order_id = request_body.get("order_id")
    pizza_id = request_body.get("pizza_id")

    if not all([order_id, pizza_id]):
        return jsonify({"msg": "Missing fields"}), 400

    order_item = OrderItems()
    order_item.new_pizzas_order(
        order_id=order_id,
        pizza_id=pizza_id
    )
    db.session.add(order_item)
    db.session.commit()  
    response_body = {
        "message" : "Order item created!",
        "data": Pizza.query.filter_by(id=pizza_id).first().serialize()
    }
    return jsonify(response_body), 200
    
@api.route('/orderitems/orderID/<int:in_order_id>', methods=['GET'])
@jwt_required()
def get_order_items(in_order_id):
    if not in_order_id:
        return jsonify ({"msg": "Not logged in"}), 400
    order_items = OrderItems.query.filter_by(order_id=in_order_id)
    if order_items is None:
        return jsonify({"msg": "No items in this order"}), 404
    pizza_info = list(map(lambda item:{**Pizza.query.filter_by(id=item.pizza_id).first().serialize(), 'orderItem_Id': item.id}, order_items))
    repeated_pizzas = {}

    for pizza in pizza_info:
        pizza_id = pizza['id']
        if pizza_id in repeated_pizzas:
            repeated_pizzas[pizza_id]['quantity'] += 1
        else:
            repeated_pizzas[pizza_id] = {
                'id': pizza['id'],
                'name': pizza['name'],
                'description': pizza['description'],
                'url': pizza['url'],
                'pizza_type': pizza['pizza_type'],
                'price': pizza['price'],
                'quantity': 1
            }
    result = list(repeated_pizzas.values())
    result.sort(key=lambda x: x['id'])
    
    response_body = {
        "message": "ok!",
        "data": result
    }

    return jsonify(response_body), 200

@api.route('/orderitems/delete', methods=['POST'])
@jwt_required()
def delete_order_item():
    request_body = request.get_json()
    pizza_id = request_body["pizza_id"]
    order_id = request_body["order_id"]
    order_item = OrderItems.query.filter_by(order_id=order_id, pizza_id=pizza_id).first()
    if order_item:
        db.session.delete(order_item)
        db.session.commit()
        return jsonify({"msg": "Order item deleted"}), 200
    else:
        return jsonify({"msg": "Order item doesn't exist"}), 404

@api.route('/ingredients', methods = ['GET'])
def get_ingredients(): 
    ingredients = Ingredient.query.all()
    ingredients_serialized = list(map(lambda item:item.serialize(), ingredients))
    response_body = {
        "message" : "ok!",
        "data": ingredients_serialized
    }
    if (get_ingredients == []):
        return jsonify({"msg": "Any ingredients yet"}), 404
    return jsonify(response_body), 200

@api.route('/ingredients/create', methods=['POST'])
@jwt_required()
def new_ingredient():
    jtw_data = get_jwt()
    user_role = jtw_data["user_role"]
    if user_role=="Admin":
        request_body = request.get_json()
        if Ingredient.query.filter_by(name=request_body["name"]).first():
            return jsonify({"msg": "Duplicated ingredient"}), 409
        jtw_data = get_jwt()
        user_role = jtw_data["user_role"]
        if user_role == "admin":
            ingredients = Ingredient()
            ingredients.new_ingredient(
                id=request_body["id"],
                name=request_body["name"]
            )
            db.session.add(ingredients)
            db.session.commit()

        return jsonify({"msg": "Ingredient created", "ingredient": ingredients.serialize()}), 201
    return jsonify({"msg": "You need to be an Admin"}), 410

@api.route('/pizzaingredients', methods = ['GET'])
def get_pizzaingredient(): 
    pizzaingredient = PizzaIngredient.query.all()
    pizzaingredient_serialized = list(map(lambda item:item.serialize(), pizzaingredient))
    response_body = {
        "message" : "ok!",
        "data": pizzaingredient_serialized
    }
    if (get_ingredients == []):
        return jsonify({"msg": "Any pizzaingredient"}), 404
    return jsonify(response_body), 200


@api.route('/pizzaingredient/create', methods = ['POST'])
@jwt_required()
def add_pizzaingredient(): 
    jtw_data = get_jwt()
    user_role = jtw_data["user_role"]
    if user_role=="Admin":
        request_body = request.get_json()
        pizzaIngredient = PizzaIngredient()
        pizzaIngredient.new_relation(
            ingredient_id = request_body.get("ingredient_id"),
            pizza_id = request_body.get("pizza_id")
        )
        db.session.add(pizzaIngredient)
        db.session.commit()

        return jsonify({"msg": "Ingredient created"}), 201
    return jsonify({"msg": "You need to be an Admin"}), 410