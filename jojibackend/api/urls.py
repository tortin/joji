from django.urls import path
from .views import ProfileDetail, ProfileList, ProfileUpdate, OfferList, ReviewList, OfferUpdate, OfferDelete, ReviewDelete

app_name = 'joji_api'

urlpatterns = [
    path('<int:pk>/', ProfileDetail.as_view(), name="detailcreate"),
    path('', ProfileList.as_view(), name="listcreate"),
    path('update/<int:pk>/', ProfileUpdate.as_view(), name="update"),
    path('reviews/', ReviewList.as_view()),
    path('offers/', OfferList.as_view()),
    path('offers/<int:pk>', OfferDelete.as_view()),
    path('offers/update/<int:pk>', OfferUpdate.as_view()),
    path('reviews/<int:pk>', ReviewDelete.as_view())
]