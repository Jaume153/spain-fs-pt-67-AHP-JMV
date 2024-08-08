from flask_sqlalchemy import SQLAlchemy
import enum

class MyRoles(enum.Enum):
    customer = "Customer"
    admin = "Admin"

class StatusOrders(enum.Enum):
    pending = "Pending"
    completed = "Completed"
    cancelled = "Cancelled"

class PaymentMethods(enum.Enum):
    credit_card = "Credit_card"
    paypal = "Paypal"
    cash = "Cash"

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    firstname = db.Column(db.String(120), nullable=False)
    role = db.Column(db.Enum(MyRoles), nullable=False, default = MyRoles.customer)

    def __repr__(self):
        return '<Users %r>' % self.id
    
    def new_user(self, username, password, email, name, firstname, role):
        self.username = username
        self.password = password
        self.email = email
        self.name = name
        self.firstname = firstname
        self.role = role
        db.session.add(self)
        db.session.commit()
        
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "name":self.name,
            "firstname": self.firstname
        }

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.Enum(StatusOrders), nullable=False, default = StatusOrders.pending)
    payment_method = db.Column(db.Enum(PaymentMethods), nullable=False, default = PaymentMethods.credit_card)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id, ondelete="CASCADE"), nullable=False)

    def __repr__(self):
        return '<Order %r>' % self.id
    
    def new_order(self, status, payment_method, user_id):
        self.status = status
        self.payment_method = payment_method
        self.user_id = user_id
        db.session.add(self)
        db.session.commit()
        
    def serialize(self):
        return {
            "id": self.id,
            "status": self.status,
            "payment_method": self.payment_method,
            "user_id":self.user_id,
        }

class Pizza(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    price =db.Column(db.Integer, nullable=False)
    url = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return '<Pizza %r>' % self.id
        
    def new_pizza(self, name, description, url, price):
        self.name = name
        self.description = description
        self.url = url
        self.price = price
        db.session.add(self)
        db.session.commit()
        
    def serialize(self):
        return {
            'id': self.id,
            'name' : self.name,
            'description' : self.description,
            'url': self.url
        }
class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    
    def __repr__(self):
        return '<Ingredient %r>' % self.id
        
    def new_ingredient(self, name):
        self.name = name
        db.session.add(self)
        db.session.commit()

    def serialize(self):
        return {
            'id': self.id,
            'name' : self.name,
        }
class PizzaIngredient(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    pizza_id = db.Column(db.Integer, db.ForeignKey(Pizza.id, ondelete="CASCADE"), nullable=False)
    ingredient_id = db.Column(db.Integer, db.ForeignKey(Ingredient.id, ondelete="CASCADE"), nullable=False)

    def __repr__(self):
        return '<PizzaIngredient %r>' % self.id
        
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'pizza_id': self.pizza_id,
            'ingredient_id': self.ingredient_id
        }

class OrderItems(db.Model): 
    id = db.Column(db.Integer, primary_key=True) 
    order_id = db.Column(db.Integer, db.ForeignKey(Order.id, ondelete="CASCADE"), nullable=False)
    pizza_id = db.Column(db.Integer, db.ForeignKey(Pizza.id, ondelete="CASCADE"), nullable=False)

    def __repr__(self):
        return '<OrderItems %r>' % self.id
    
    def new_pizzas_order(self, order_id, pizza_id):
        self.order_id = order_id
        self.pizza_id = pizza_id
        db.session.add(self)
        db.session.commit()
        
    def serialize(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'pizza_id': self.pizza_id
        }