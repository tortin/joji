from django.urls import path
from .views import ProfileDetail, ProfileList

app_name = 'joji_api'

urlpatterns = [
    path('<int:pk>/', ProfileDetail.as_view(), name="detailcreate"),
    path('', ProfileList.as_view(), name="listcreate")
]