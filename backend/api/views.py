from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User, Board, List, Card
from .serializer import UserSerializer, BoardSerializer, ListSerializer, CardSerializer

from http import HTTPStatus


class UserView(APIView):
    """View that use for User CRUD operations"""

    def get(self, request):
        """get all users"""
        user = User.objects.all()
        users_serializer = UserSerializer(user, many=True)
        return Response(users_serializer.data)

    def post(self, request):
        """insert user"""
        data = request.data
        users_serializer = UserSerializer(data=data)

        if users_serializer.is_valid(raise_exception=ValueError):
            users_serializer.save()

            content = {'response': data}
        else:
            content = {'response': users_serializer.error_messages}

        return Response(content)

    def put(self, request):
        """update Board"""

        try:
            user_id = request.data["id"]
            old_data = User.objects.get(id=user_id)
            serializer = UserSerializer(old_data, data=request.data)
        except User.DoesNotExist:
            return Response({'message': "incorrect id"}, status=HTTPStatus.BAD_REQUEST)

        if serializer.is_valid(raise_exception=ValueError):
            serializer.save()
            return Response(serializer.data, status=HTTPStatus.OK)
        else:
            return Response(serializer.error_messages, status=HTTPStatus.BAD_REQUEST)

    def delete(self, request):
        """delete user"""

        try:
            user_id = request.data["id"]
            old_data = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'message': "incorrect id"}, status=HTTPStatus.BAD_REQUEST)

        if old_data:
            old_data.delete()
            return Response({'response': "successfully deleted"}, status=HTTPStatus.OK)
        else:
            return Response("error", status=HTTPStatus.BAD_REQUEST)


class BoardView(APIView):
    """View that use for Board CRUD operations"""

    def get(self, request):
        """get all boards"""
        board = Board.objects.all()
        board_serializer = BoardSerializer(board, many=True)
        return Response(board_serializer.data)

    def post(self, request):
        """insert board """
        data = request.data
        board_serializer = BoardSerializer(data=data)

        if board_serializer.is_valid(raise_exception=ValueError):
            board_serializer.save()

            content = {'response': data}
        else:
            content = {'response': board_serializer.error_messages}

        return Response(content)

    def put(self, request):
        """update Board"""

        try:
            board_id = request.data["id"]
            old_data = Board.objects.get(id=board_id)
            serializer = BoardSerializer(old_data, data=request.data)
        except Board.DoesNotExist:
            return Response({'message': "incorrect id"}, status=HTTPStatus.BAD_REQUEST)

        if serializer.is_valid(raise_exception=ValueError):
            serializer.save()
            return Response(serializer.data, status=HTTPStatus.OK)
        else:
            return Response(serializer.error_messages, status=HTTPStatus.BAD_REQUEST)

    def delete(self, request):
        """delete board"""

        try:
            board_id = request.data["id"]
            old_data = Board.objects.get(id=board_id)
        except Board.DoesNotExist:
            return Response({'message': "incorrect id"}, status=HTTPStatus.BAD_REQUEST)

        if old_data:
            old_data.delete()
            return Response({'response': "successfully deleted"}, status=HTTPStatus.OK)
        else:
            return Response("error", status=HTTPStatus.BAD_REQUEST)


class ListView(APIView):
    """View that use for List CRUD operations"""

    def get(self, request):
        """get all lists"""
        lists = List.objects.all()
        list_serializer = ListSerializer(lists, many=True)
        return Response(list_serializer.data)

    def post(self, request):
        """insert list """
        data = request.data
        list_serializer = ListSerializer(data=data)

        if list_serializer.is_valid(raise_exception=ValueError):
            # add list
            saved_list = list_serializer.save()
            # add new list to board order array
            parent_board = Board.objects.get(id=data["board_id"])
            parent_board.list_order.append(saved_list.id)
            parent_board.save()

            content = {'response': list_serializer.data}
        else:
            content = {'response': list_serializer.error_messages}

        return Response(content)

    def put(self, request):
        """update List"""

        try:
            list_id = request.data["id"]
            old_data = List.objects.get(id=list_id)
            serializer = ListSerializer(old_data, data=request.data)
        except List.DoesNotExist:
            return Response({'message': "incorrect id"}, status=HTTPStatus.BAD_REQUEST)

        if serializer.is_valid(raise_exception=ValueError):
            serializer.save()
            return Response(serializer.data, status=HTTPStatus.OK)
        else:
            return Response(serializer.error_messages, status=HTTPStatus.BAD_REQUEST)

    def delete(self, request):
        """delete list"""

        try:
            list_id = request.data["id"]
            old_data = List.objects.get(id=list_id)
        except List.DoesNotExist:
            return Response({'message': "incorrect id"}, status=HTTPStatus.BAD_REQUEST)

        if old_data:
            # delete list from list order array in board
            parent_board = Board.objects.get(id=old_data.board_id.id)
            parent_board.list_order.remove(int(list_id))
            parent_board.save()
            # delete list
            old_data.delete()
            return Response({'response': "successfully deleted"}, status=HTTPStatus.OK)
        else:
            return Response("error", status=HTTPStatus.BAD_REQUEST)


class CardView(APIView):
    """View that use for Card CRUD operations"""

    def get(self, request):
        """get all Cards"""
        cards = Card.objects.all()
        card_serializer = CardSerializer(cards, many=True)
        return Response(card_serializer.data)

    def post(self, request):
        """insert Card """
        data = request.data
        card_serializer = CardSerializer(data=data)

        if card_serializer.is_valid(raise_exception=ValueError):
            # add card
            saved_card = card_serializer.save()
            # add new card to card order array in list
            parent_list = List.objects.get(id=data["list_id"])
            parent_list.card_order.append(saved_card.id)
            parent_list.save()

            content = {'response': card_serializer.data}
        else:
            content = {'response': card_serializer.error_messages}

        return Response(content)

    def put(self, request):
        """update Card"""

        try:
            card_id = request.data["id"]
            old_data = Card.objects.get(id=card_id)
            serializer = CardSerializer(old_data, data=request.data)
        except Card.DoesNotExist:
            return Response({'message': "incorrect id"}, status=HTTPStatus.BAD_REQUEST)

        if serializer.is_valid(raise_exception=ValueError):
            serializer.save()
            return Response(serializer.data, status=HTTPStatus.OK)
        else:
            return Response(serializer.error_messages, status=HTTPStatus.BAD_REQUEST)

    def delete(self, request):
        """delete Card"""

        try:
            card_id = request.data["id"]
            old_data = Card.objects.get(id=card_id)
        except Card.DoesNotExist:
            return Response({'message': "incorrect id"}, status=HTTPStatus.BAD_REQUEST)

        if old_data:
            # delete card from card order array in list
            parent_list = List.objects.get(id=old_data.list_id.id)
            parent_list.card_order.remove(int(card_id))
            parent_list.save()
            # delete card
            old_data.delete()
            return Response({'response': "successfully deleted"}, status=HTTPStatus.OK)
        else:
            return Response("error", status=HTTPStatus.BAD_REQUEST)
