
import re
from django.core.exceptions import ValidationError
import stripe
from django.conf import settings
from cities_light.models import City
from .models import *
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from django.contrib.auth import authenticate
from .serializer import *
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.contrib import messages
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from django.core.validators import validate_email
from twilio.rest import Client


User = get_user_model()

# Create your views here.

stripe.api_key = settings.STRIPE_SECRET_KEY


class LoginView(APIView):
    def post(self, request):
        phone_number = request.data['phone_number']
        password = request.data['password']
        # user_data = authenticate(phone_number=phone_number, password=password)
        user_data = User.objects.filter(
            phone_number=phone_number).values()
        if(user_data and check_password(password, user_data[0]['password'])):
            data = User.objects.get(phone_number=phone_number)
            refresh = RefreshToken.for_user(data)
            data = {
                'message': 'login successfully',
                'refresh': str(refresh),
                'token': str(refresh.access_token),
                'id': data.id,
                'phone_number': data.phone_number,
                'user_name': data.username,
                # 'user_address': data.address,
            }
            # return JsonResponse(data)
            return Response(status=HTTP_200_OK, data=data)
        else:
            # print('user not found')
            error = {
                "error": "user not found"
            }
            return Response(status=HTTP_400_BAD_REQUEST, data=error)


class RegisterView(APIView):
    def post(self, request):
        email = request.data['email']
        user_name = request.data['user_name']
        phone_number = request.data['phone_number']
        password = request.data['password']
        confirm_password = request.data['confirm_password']

        if user_name == '' or email == '' or phone_number == '' or password == '' or confirm_password == '':
            error = {
                "error": "please enter valid data"
            }
            return Response(status=HTTP_400_BAD_REQUEST, data=error)

        # val_email = validate_email(email)
        try:
            validate_email(email)
        except ValidationError as e:
            error = {
                "error": "please enter valid email"
            }
            return Response(status=HTTP_400_BAD_REQUEST, data=error)

        # Pattern = re.compile("(0|91)?[7-9][0-9]{9}")
        Pattern = re.compile('^[2-9]{2}[0-9]{8}$')
        if Pattern.match(phone_number):
            # return Response(status=HTTP_400_BAD_REQUEST, data=error)
            print("okkkkk")
        else:
            error = {
                "error": "phone number not valid"
            }
            return Response(status=HTTP_400_BAD_REQUEST, data=error)

        if password != confirm_password:
            error = {
                "error": "password not match"
            }
            return Response(status=HTTP_400_BAD_REQUEST, data=error)
            # message = "password not match"
            # return JsonResponse({'message':message}, status=HTTP_400_BAD_REQUEST)

        # valid_phone=re = "^[2-9]{2}[0-9]{8}$"
        # if phone_number.match(valid_phone):
        #     print("yes")
        # else:
        #     error = {
        #         "error": "please enter valid phone"
        #     }
        #     return Response(status=HTTP_400_BAD_REQUEST, data=error)

        user_data = User.objects.filter(phone_number=phone_number)
        if user_data:
            error = {
                "error": "user allready exist"
            }
            return Response(status=HTTP_400_BAD_REQUEST, data=error)
        else:
            user = User(username=user_name, password=make_password(password),
                        phone_number=phone_number, email=email)
            # print(user)
            user.save()
            refresh = RefreshToken.for_user(user)
            msg = {
                "message": "register successfully",
                'refresh': str(refresh),
                'token': str(refresh.access_token),
                'id': user.id,
                'phone_number': user.phone_number,
                'user_name': user.username,
            }
            return Response(status=HTTP_200_OK, data=msg)


class GetallproductView(APIView):
    def get(self, request):
        product_data = Product.objects.all().values()
        data = list(product_data)

        for ddata in range(len(data)):
            # print(data[ddata])
            if(data[ddata]['product_image'] == ''):
                data[ddata]['product_image'] = None
            else:
                # print(data[ddata]['image'])
                image_url = 'http://127.0.0.1:8000/media/' + \
                    (data[ddata]['product_image'])
                data[ddata]['product_image'] = image_url

        return Response(status=HTTP_200_OK, data=data)
        # return Response(status=HTTP_200_OK,data=data)


class ProductView(APIView):
    def post(self, request):
        product_id = request.data['id']
        product_data = Product.objects.filter(id=product_id).values()
        print(product_data)
        data = list(product_data)
        if product_data:
            for ddata in range(len(data)):
                if(data[ddata]['product_image'] == ''):
                    data[ddata]['product_image'] = None
                else:
                    image_url = 'http://127.0.0.1:8000/media/' + \
                        (data[ddata]['product_image'])
                    image_detail_url = 'http://127.0.0.1:8000/media/' + \
                        (data[ddata]['product_detail_image'])
                    data[ddata]['product_image'] = image_url
                    data[ddata]['product_detail_image'] = image_detail_url
            return Response(status=HTTP_200_OK, data=data)
        else:
            error = {
                "error": "product not found"
            }
            return Response(status=HTTP_400_BAD_REQUEST, data=error)


class AddtocartView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_id = request.data['user_id']
        product_id = request.data['product_id']

        u_id = User.objects.get(id=user_id)
        p_id = Product.objects.get(id=product_id)

        check_data = CartItem.objects.filter(
            user=u_id, product=p_id, ordered=False).values()

        product_data = Product.objects.filter(id=product_id).values()
        product_price = int(product_data[0]['product_price'])
        # print(product_data)

        # print(check_data[0]['quantity'])
        # print(list(check_data))

        if check_data.exists():
            q_data = check_data[0]['quantity'] + 1
            # print(q_data)
            p_price = product_price * q_data
            print(p_price)
            update_data = CartItem.objects.filter(user=u_id, product=p_id).update(
                quantity=q_data, total_price=p_price)

            cart_data = CartItem.objects.filter(user=user_id).values()

            # product_data=Product.objects.filter(id=product_id).values()
            # print(cart_data)
            list_of_cart = list(cart_data)
            total_cart_price = 0
            # print(total_cart_price)
            for data in range(len(list_of_cart)):
                print(list_of_cart[data]['total_price'])
                total_cart_price = total_cart_price + \
                    list_of_cart[data]['total_price']
            # print(total_cart_price)
            data = {
                "msg": "update cart successfully",
                "cart_data": cart_data,
                "total_cart_price": total_cart_price
                # "product_data":product_data
            }
            return Response(status=HTTP_200_OK, data=data)

        else:
            addcart_data = CartItem.objects.create(
                user=u_id, ordered=False, product=p_id, total_price=product_price)
            addcart_data.save()
            cart_data = CartItem.objects.filter(user=user_id).values()
            list_of_cart = list(cart_data)
            total_cart_price = 0
            for data in range(len(list_of_cart)):
                print(list_of_cart[data]['total_price'])
                total_cart_price = total_cart_price + \
                    list_of_cart[data]['total_price']
            # product_data=Product.objects.filter(id=product_id).values()

            data = {
                "msg": "Add in cart successfully",
                "cart_data": cart_data,
                "total_cart_price": total_cart_price
                # "product_data":product_data
            }
            return Response(status=HTTP_200_OK, data=data)


class RemovetocartView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_id = request.data['user_id']
        product_id = request.data['product_id']

        u_id = User.objects.get(id=user_id)
        p_id = Product.objects.get(id=product_id)

        check_data = CartItem.objects.filter(user=u_id, product=p_id).values()

        product_data = Product.objects.filter(id=product_id).values()
        product_price = int(product_data[0]['product_price'])

        if check_data.exists():
            q_data = check_data[0]['quantity'] - 1
            p_price = product_price * q_data
            # print(q_data)
            update_data = CartItem.objects.filter(user=u_id, product=p_id).update(
                quantity=q_data, total_price=p_price)

            cart_data = CartItem.objects.filter(user=user_id).values()
            list_of_cart = list(cart_data)
            total_cart_price = 0
            for data in range(len(list_of_cart)):
                print(list_of_cart[data]['total_price'])
                total_cart_price = total_cart_price + \
                    list_of_cart[data]['total_price']

            product_data = Product.objects.filter(id=product_id).values()

            data = {
                "msg": "update cart successfully",
                "cart_data": cart_data,
                "total_cart_price": total_cart_price

                # "product_data":product_data
            }
            return Response(status=HTTP_200_OK, data=data)


class UsercartlistView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_id = request.data['user_id']
        u_id = User.objects.get(id=user_id)
        cart_data = CartItem.objects.filter(user=u_id, ordered=False).values()
        list_of_cart = list(cart_data)
        total_cart_price = 0
        for data in range(len(list_of_cart)):
            print(list_of_cart[data]['total_price'])
            total_cart_price = total_cart_price + \
                list_of_cart[data]['total_price']
        # print(cart_list)
        data = {
            "msg": "get cart successfully",
            "cart_data": cart_data,
            "total_cart_price": total_cart_price
            # "product_data":product_data
        }
        return Response(status=HTTP_200_OK, data=data)


class GetuserView(APIView):
    def post(self, request):
        data = User.objects.all().values()
        return Response(status=HTTP_200_OK, data=data)


class DeletecartitemView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_id = request.data['user_id']
        cart_product_id = request.data['cart_product_id']

        data = CartItem.objects.get(id=cart_product_id, user=user_id)
        data.delete()
        print(data)
        cart_data = CartItem.objects.filter(user=user_id).values()
        list_of_cart = list(cart_data)
        total_cart_price = 0
        for data in range(len(list_of_cart)):
            print(list_of_cart[data]['total_price'])
            total_cart_price = total_cart_price + \
                list_of_cart[data]['total_price']
        data = {
            "msg": "get cart successfully",
            "cart_data": cart_data,
            "total_cart_price": total_cart_price
            # "product_data":product_data
        }
        return Response(status=HTTP_200_OK, data=data)


class CityView(APIView):
    def post(self, request):
        city_data = City.objects.all().values()
        data = list(city_data)
        return Response(status=HTTP_200_OK, data=data)


class AddressView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_id = request.data['user_id']
        address = request.data['Address']
        pincode = request.data['pincode']
        country_id = request.data['country_id']

        u_id = User.objects.get(id=user_id)
        c_id = City.objects.get(id=country_id)
        address_data = Address.objects.create(
            user=u_id, address=address, pincode=pincode, city=c_id)
        address_data.save()
        data = {
            "msg": "address add successfully",
        }
        return Response(status=HTTP_200_OK, data=data)

    def get(self, request, id):
        # user_id = request.data['user_id']

        address_data = Address.objects.filter(user=id).values()
        city_id = address_data[0]['city_id']

        address_city = City.objects.filter(id=city_id).values()
        city_name = address_city[0]['display_name']
        print(city_name)
        data = {
            "msg": "address get successfully",
            "address": address_data,
            "city": city_name
        }

        if address_data.exists():
            return Response(status=HTTP_200_OK, data=data)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        address = request.data['address']
        pincode = request.data['pincode']
        country_id = request.data['countryid']
        u_id = User.objects.get(id=id)
        c_id = City.objects.get(id=country_id)

        card_data = Address.objects.filter(user=u_id).update(
            address=address, pincode=pincode, city=c_id)
        data = {
            "msg": "address update successfully",
        }
        return Response(status=HTTP_200_OK, data=data)


class PaymentView(APIView):
    def post(self, request):
        id = request.data['id']
        amount = request.data['amount']
        user = request.data['user']
        phone_number = request.data['phone_number']
        print(phone_number)
        u_id = User.objects.get(id=user)
        try:
            charge = stripe.PaymentIntent.create(
                amount=amount*100,  # cents
                currency="INR",
                payment_method=id,
                confirm=True
            )
            # print(charge)

            # create the payment
            payment = Payment()
            payment.stripe_charge_id = id
            payment.user = u_id
            payment.amount = amount
            payment.save()

            cartitem = CartItem.objects.filter(
                user=u_id, ordered=False).values()
            c_item = list(cartitem)
            # print(cartitem)
            # print(c_item)
            for item in range(len(c_item)):
                # c_item[item]['ordered'] = True
                ordered = c_item[item]['ordered'] = True
                cartitem.update(ordered=True)

            account_sid = 'AC77211d7c0da4687ecee9d3ca46e752a8'
            auth_token = '35dc963843a797c373bc6add2be30dab'
            client = Client(account_sid, auth_token)
            message = client.messages.create(
                messaging_service_sid='MG533b1237821f73c88991d02a4b507f1f',
                from_='+13108701082',
                body='payment done. your ordered item will be deliver soon.',
                to=f'+91{phone_number}',
                # to='+918238937978'
                # to='+919727599219'

            )
            data = {
                "msg": "payment successfully"
            }
            return Response(status=HTTP_200_OK, data=data)

        except stripe.error.CardError as e:
            body = e.json_body
            err = body.get('error', {})
            messages.error(self.request, f"{err.get('message')}")
            return Response(status=HTTP_400_BAD_REQUEST, data='a')

        except stripe.error.RateLimitError as e:
            # Too many requests made to the API too quickly
            messages.error(self.request, "Rate limit error")
            return Response(status=HTTP_400_BAD_REQUEST, data='b')

        except stripe.error.InvalidRequestError as e:
            # Invalid parameters were supplied to Stripe's API
            messages.error(self.request, "Invalid parameters")

            return Response(status=HTTP_400_BAD_REQUEST, data='c')

        except stripe.error.AuthenticationError as e:
            # Authentication with Stripe's API failed
            # (maybe you changed API keys recently)
            messages.error(self.request, "Not authenticated")
            return Response(status=HTTP_400_BAD_REQUEST, data='d')

        except stripe.error.APIConnectionError as e:
            # Network communication with Stripe failed
            messages.error(self.request, "Network error")
            return Response(status=HTTP_400_BAD_REQUEST, data='e')

        except stripe.error.StripeError as e:
            # Display a very generic error to the user, and maybe send
            # yourself an email
            messages.error(
                self.request, "Something went wrong. You were not charged. Please try again.")
            return Response(status=HTTP_400_BAD_REQUEST, data='f')

        except Exception as e:
            # send an email to ourselves
            messages.error(
                self.request, "A serious error occurred. We have been notifed.")
            return Response(status=HTTP_400_BAD_REQUEST, data='g')

        # data = {
        #     'id':id,
        #     'amount':amount,
        #     'user':user,
        # }
        # return Response(status=HTTP_200_OK, data=data)


class Fetchproductofmobile(APIView):
    def get(self, request):
        sub_category_name = Sub_category.objects.filter(
            sub_category_name="phone").values()
        sub_category_id = sub_category_name[0]['id']
        # print(category_name)
        # print(category_id)
        product_data = Product.objects.filter(
            product_subcategory=sub_category_id).values()
        # print(prooduct_data)
        data = list(product_data)

        for ddata in range(len(data)):
            # print(data[ddata])
            if(data[ddata]['product_image'] == ''):
                data[ddata]['product_image'] = None
            else:
                # print(data[ddata]['image'])
                image_url = 'http://127.0.0.1:8000/media/' + \
                    (data[ddata]['product_image'])
                data[ddata]['product_image'] = image_url
        data = {
            "msg": "get mobile data successfully",
            "data": data,
            "sub_category_id": sub_category_id
        }
        return Response(status=HTTP_200_OK, data=data)


class Fetchproductofbackpack(APIView):
    def get(self, request):
        sub_category_name = Sub_category.objects.filter(
            sub_category_name="backpack").values()
        sub_category_id = sub_category_name[0]['id']
        # print(category_name)
        # print(category_id)
        product_data = Product.objects.filter(
            product_subcategory=sub_category_id).values()
        # print(prooduct_data)
        data = list(product_data)

        for ddata in range(len(data)):
            # print(data[ddata])
            if(data[ddata]['product_image'] == ''):
                data[ddata]['product_image'] = None
            else:
                # print(data[ddata]['image'])
                image_url = 'http://127.0.0.1:8000/media/' + \
                    (data[ddata]['product_image'])
                data[ddata]['product_image'] = image_url
        data = {
            "msg": "get mobile data successfully",
            "data": data,
            "sub_category_id": sub_category_id
        }
        return Response(status=HTTP_200_OK, data=data)


class Fetchproductofwatch(APIView):
    def get(self, request):
        sub_category_name = Sub_category.objects.filter(
            sub_category_name="watch").values()
        sub_category_id = sub_category_name[0]['id']
        # print(category_name)
        # print(category_id)
        product_data = Product.objects.filter(
            product_subcategory=sub_category_id).values()
        # print(prooduct_data)
        data = list(product_data)

        for ddata in range(len(data)):
            # print(data[ddata])
            if(data[ddata]['product_image'] == ''):
                data[ddata]['product_image'] = None
            else:
                # print(data[ddata]['image'])
                image_url = 'http://127.0.0.1:8000/media/' + \
                    (data[ddata]['product_image'])
                data[ddata]['product_image'] = image_url
        data = {
            "msg": "get mobile data successfully",
            "data": data,
            "sub_category_id": sub_category_id
        }
        return Response(status=HTTP_200_OK, data=data)


class Fetchproductofsound(APIView):
    def get(self, request):
        sub_category_name = Sub_category.objects.filter(
            sub_category_name="headphone&sound").values()
        sub_category_id = sub_category_name[0]['id']
        # print(category_name)
        # print(category_id)
        product_data = Product.objects.filter(
            product_subcategory=sub_category_id).values()
        # print(prooduct_data)
        data = list(product_data)

        for ddata in range(len(data)):
            # print(data[ddata])
            if(data[ddata]['product_image'] == ''):
                data[ddata]['product_image'] = None
            else:
                # print(data[ddata]['image'])
                image_url = 'http://127.0.0.1:8000/media/' + \
                    (data[ddata]['product_image'])
                data[ddata]['product_image'] = image_url
        data = {
            "msg": "get mobile data successfully",
            "data": data,
            "sub_category_id": sub_category_id
        }
        return Response(status=HTTP_200_OK, data=data)


class Fetchproduct_by_sub_category_id(APIView):
    def post(self, request):
        sub_category_id = request.data['id']
        # get_category_id = Sub_category.objects.filter(id=sub_category_id).values()
        # print(get_category_id)
        get_data = Product.objects.filter(
            product_subcategory=sub_category_id).values()
        # print(get_data)
        data = list(get_data)

        for ddata in range(len(data)):
            # print(data[ddata])
            if(data[ddata]['product_image'] == ''):
                data[ddata]['product_image'] = None
            else:
                # print(data[ddata]['image'])
                image_url = 'http://127.0.0.1:8000/media/' + \
                    (data[ddata]['product_image'])
                data[ddata]['product_image'] = image_url
        data = {
            "msg": "get data successfully",
            "data": data

        }
        return Response(status=HTTP_200_OK, data=data)


class Update_username(APIView):
    def patch(self, request):
        username = request.data['username']
        user_id = request.data['user_id']

        if(username == ""):
            error = {
                "error": "User can not be empty"
            }
            return Response(status=HTTP_400_BAD_REQUEST, data=error)

        user_data = User.objects.filter(id=user_id).update(username=username)
        data = {
            "msg": "username update successfully",
        }
        return Response(status=HTTP_200_OK, data=data)


class Update_phonenumber(APIView):
    def patch(self, request):
        user_phone_number = request.data['user_phone_number']
        user_id = request.data['user_id']

        # cheack validation
        Pattern = re.compile('^[2-9]{2}[0-9]{8}$')
        if Pattern.match(user_phone_number):
            # return Response(status=HTTP_400_BAD_REQUEST, data=error)
            print("okkkkk")
        else:
            error = {
                "error": "phone number not valid"
            }
            return Response(status=HTTP_400_BAD_REQUEST, data=error)

        # check phonenumber in database
        user_data = User.objects.filter(phone_number=user_phone_number)
        if user_data:
            error = {
                "error": "user allready exist"
            }
            return Response(status=HTTP_400_BAD_REQUEST, data=error)

        user_data = User.objects.filter(id=user_id).update(
            phone_number=user_phone_number)
        data = {
            "msg": "phonenumber update successfully",
        }
        return Response(status=HTTP_200_OK, data=data)


class Getuserdetail(APIView):
    def post(self, request):
        user_id = request.data['user_id']

        user_data = User.objects.filter(id=user_id).values()
        print(user_data[0])
        data = {
            "phonenumber": user_data[0]['phone_number'],
            "username": user_data[0]['username'],
            "msg": "userdata get successfully",
        }
        return Response(status=HTTP_200_OK, data=data)


class Update_password(APIView):
    def patch(self, request):
        password = request.data['password']
        new_password = request.data['new_password']
        confirm_password = request.data['confirm_password']
        user_id = request.data['user_id']

        # if request.data['password'].DoesNotExist():
        #     data = {
        #         "msg": "password can not be empty"
        #     }
        #     return Response(status=HTTP_400_BAD_REQUEST, data=data)
        # else:
        #     password = request.data['password']

        # if request.data['new_password']:
        #     new_password = request.data['new_password']
        # else:
        #     data = {
        #         "msg": "new password can not be empty"
        #     }
        #     return Response(status=HTTP_400_BAD_REQUEST, data=data)

        # if request.data['confirm_password']:
        #     confirm_password = request.data['confirm_password']
        # else:
        #     data = {
        #         "msg": "confirm password can not be empty"
        #     }
        #     return Response(status=HTTP_400_BAD_REQUEST, data=data)

        # if password == '':
        #     data = {
        #         "msg": "password can not be empty"
        #     }
        #     return Response(status=HTTP_400_BAD_REQUEST, data=data)
        # if new_password == '':
        #     data = {
        #         "msg": "new password can not be empty"
        #     }
        #     return Response(status=HTTP_400_BAD_REQUEST, data=data)
        # if confirm_password == '':
        #     data = {
        #         "msg": "confirm password can not be empty"
        #     }
        #     return Response(status=HTTP_400_BAD_REQUEST, data=data)

        user = User.objects.filter(id=user_id).values()
        print(user)
        if user:
            if check_password(password, user[0]['password']):
                print("password match")
                if new_password == confirm_password:
                    user_password = User.objects.filter(
                        id=user_id).update(password=make_password(new_password))
                    data = {
                        "msg": "password updated"
                    }
                    return Response(status=HTTP_200_OK, data=data)
                else:
                    data = {
                        "msg": "new password and confirm password are not match"
                    }
                    return Response(status=HTTP_400_BAD_REQUEST, data=data)
            else:
                data = {
                    "msg": "password is incorrect"
                }
                return Response(status=HTTP_400_BAD_REQUEST, data=data)
        else:
            data = {
                "msg": "user not found",
            }
            return Response(status=HTTP_400_BAD_REQUEST, data=data)


class User_ordered_item(APIView):
    def post(self, request):
        user_id = request.data['user_id']
        user_item_data = CartItem.objects.filter(
            user=user_id, ordered=True).values()

        # print(user_item_data)
        if user_item_data:
            cart_data = list(user_item_data)
            for ddata in range(len(cart_data)):
                product_id=cart_data[ddata]['product_id']
                productdetail=Product.objects.filter(id=product_id).values()
                product_data=list(productdetail)
                for pdata in range(len(product_data)):
                    print(product_data[pdata]["product_name"])      
                    image_url = 'http://127.0.0.1:8000/media/' + \
                        (product_data[pdata]['product_image'])
                    product_data[pdata]['product_image'] = image_url
                    cart_data[ddata]['product_id']=product_data
            data = {
                "msg": " get successfully",
                "product_data": cart_data,
            }
            return Response(status=HTTP_200_OK, data=data)
        else:
            data = {
                "msg": "not found",
            }
            return Response(status=HTTP_400_BAD_REQUEST, data=data)
