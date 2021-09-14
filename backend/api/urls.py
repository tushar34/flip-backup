from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('login/', LoginView.as_view(), name="login"),
    path('register/', RegisterView.as_view(), name="register"),
    path('getallproduct/', GetallproductView.as_view(), name="getallproduct"),
    path('getproduct/', ProductView.as_view(), name="product"),
    path('addtocart/', AddtocartView.as_view(), name="cart"),
    path('removetocart/', RemovetocartView.as_view(), name="remove-cart"),
    path('usercartlist/', UsercartlistView.as_view(), name="cart-list"),
    path('getuser/', GetuserView.as_view(), name="user"),
    path('deletecartitem/', DeletecartitemView.as_view(), name="deletecartitem"),
    path('city/', CityView.as_view(), name="city"),
    path('address/', AddressView.as_view(), name="address"),
    path('get-address/<int:id>', AddressView.as_view(), name="get-address"),
    path('edit-address/<int:id>', AddressView.as_view(), name="edit-address"),
    path('payment', PaymentView.as_view(), name="payment"),
    path('mobile-data/', Fetchproductofmobile.as_view(), name="mobile-data"),
    path('sub_category_data/', Fetchproduct_by_sub_category_id.as_view(),
         name="get-data-by-sub_ca_id"),
    path('backpack-data/', Fetchproductofbackpack.as_view(), name="backpack-data"),
    path('watch-data/', Fetchproductofwatch.as_view(), name="watch-data"),
    path('sound-data/', Fetchproductofsound.as_view(), name="sound-data"),
    path('update-username/', Update_username.as_view(), name="update_username"),
    path('get-user/', Getuserdetail.as_view(), name="getuser"),
    path('update-phonenumber/', Update_phonenumber.as_view(), name="update-phonenumber"),
    path('update-password/', Update_password.as_view(), name="update-password"),
    path('get-ordered-item/', User_ordered_item.as_view(), name="get-order-data"),
    
]
