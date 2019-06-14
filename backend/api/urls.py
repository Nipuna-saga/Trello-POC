from django.urls import path
from .views import UserView, BoardView, ListView, CardView

app_name = 'api'

urlpatterns = [
    path('user', UserView.as_view(), name="user"),
    path('board', BoardView.as_view(), name="board"),
    path('list', ListView.as_view(), name="list"),
    path('card', CardView.as_view(), name="card"),
]
