from rest_framework import serializers

from .models import User, Board, List, Card


class UserSerializer(serializers.ModelSerializer):
    """User serializer"""

    class Meta:
        model = User
        fields = ("id", "name")


class BoardSerializer(serializers.ModelSerializer):
    """Board serializer"""

    class Meta:
        model = Board
        fields = ("id", "title", "list_order", "board_owner_id")


class ListSerializer(serializers.ModelSerializer):
    """List serializer"""

    class Meta:
        model = List
        fields = ("id", "title", "card_order", "board_id")


class CardSerializer(serializers.ModelSerializer):
    """Card serializer"""

    class Meta:
        model = Card
        fields = ("id", "title", "description", "due_date", "list_id")
