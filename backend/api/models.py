from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager
from django.contrib.auth.hashers import make_password, check_password
from django_countries.fields import CountryField
from cities_light.models import City
# Create your models here.

# login and password
# 9727599220
# admin
# tusharparadva

class Usermanager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, phone_number, password=None, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not phone_number:
            raise ValueError('Users must have an phone number')

        user = self.model(
            phone_number=phone_number
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, phone_number, password):
        """
        Creates and saves a staff user with the given email and password.
        """
        user = self.create_user(
            phone_number=phone_number,
            password=password,
        )
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, password, **extra_fields):
        """
        Creates and saves a superuser with the given email and password.
        """
        print(phone_number)
        print(password)
        user = self.create_user(
            phone_number=phone_number,
            password=password,
        )
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save(using=self._db)
        return user



class User(AbstractUser):
    username = models.CharField(max_length=20, null=True, blank=True)
    phone_number = models.CharField(max_length=20, unique=True)
    # username = models.CharField(max_length=50, null=True, blank=True,unique=False)
    USERNAME_FIELD = "phone_number"
    REQUIRED_FIELDS = []

    objects = Usermanager()

    def __str__(self):
        return self.phone_number


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.TextField(max_length=100)
    pincode = models.CharField(max_length=50, null=True, blank=True)
    city = models.ForeignKey(
        City, max_length=50, null=True, blank=True, on_delete=models.CASCADE)
    # country = CountryField(multiple=False,null=True,blank=True)

    def __str__(self):
        return self.user.phone_number


class Category(models.Model):
    category_name = models.CharField(max_length=50)

    def __str__(self):
        return self.category_name


class Sub_category(models.Model):
    sub_category_name = models.CharField(max_length=50)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.sub_category_name)


class Product(models.Model):
    product_name = models.CharField(max_length=50)
    product_price = models.CharField(max_length=50)
    product_image = models.ImageField(blank=True, null=True)
    product_detail_image = models.ImageField(blank=True, null=True)
    product_category = models.ForeignKey(Category, on_delete=models.CASCADE)
    product_subcategory = models.ForeignKey(
        Sub_category, on_delete=models.CASCADE)
    product_specification = models.JSONField(null=True)

    def __str__(self):
        return self.product_name


class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    total_price = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return str(self.user)


class Payment(models.Model):
    stripe_charge_id = models.CharField(max_length=50)
    user = models.ForeignKey(User,
                             on_delete=models.CASCADE)
    amount = models.FloatField()

    def __str__(self):
        return self.user.phone_number


