"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token

from .api.views import index_view, CustomAuthToken, MessageViewSet, CalculateHolesView

router = routers.DefaultRouter()
router.register('messages', MessageViewSet)


urlpatterns = [
    path('api/signup/', CustomAuthToken.as_view()),
    path('api/login/', obtain_jwt_token),
    path('api/verify/', verify_jwt_token),

    # http://localhost:8000/
    path('', index_view, name='index'),

    # http://localhost:8000/api/<router-viewsets>
    path('api/v1/', include(router.urls)),
    path('api/v1/holes', CalculateHolesView.as_view()),

    # http://localhost:8000/api/admin/
    path('api/admin/', admin.site.urls),
]
