from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(User)
admin.site.register(Category)
admin.site.register(Sub_category)
admin.site.register(Product)
admin.site.register(CartItem)
admin.site.register(Address)
admin.site.register(Payment)






