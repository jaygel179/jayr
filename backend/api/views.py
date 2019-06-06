from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework_jwt.settings import api_settings
from rest_framework.views import APIView

import requests

from django.contrib.auth import get_user_model
from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache

from .models import Message, MessageSerializer

UserModel = get_user_model()

# Serve Vue Application
index_view = never_cache(TemplateView.as_view(template_name='index.html'))


class CustomAuthToken(ObtainAuthToken):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        validated_data = request.data

        try:
            user = UserModel.objects.create(
                username=validated_data['username']
            )
        except Exception:
            return Response({
                'message': 'Username is already used.',
            }, status=status.HTTP_409_CONFLICT)

        user.set_password(validated_data['password'])
        user.save()

        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)

        return Response({
            'token': token,
        })


class MessageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows messages to be viewed or edited.
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class CalculateHolesView(APIView):

    def get(self, request):
        string_to_calculate = request.GET.get('string')

        url = "https://ktv9h6zsib.execute-api.us-east-2.amazonaws.com/prod?string={}".format(string_to_calculate)
        response = requests.get(url)

        return Response({
            'count': response.json().get('number_of_holes'),
        }, status=status.HTTP_200_OK)
