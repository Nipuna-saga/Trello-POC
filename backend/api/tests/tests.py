import json

from rest_framework.test import APITestCase
from ..models import User, Board, List, Card
from django.urls import reverse
from ..serializer import UserSerializer, BoardSerializer


class UserTest(APITestCase):
    """ Test module for User View"""
    url = reverse("api:user")

    def setUp(self):
        self.james = User.objects.create(name="james")

    def test_create_user(self):
        """test create user endpoint"""
        response = self.client.post(self.url, {"name": "James Vinc"})
        self.assertEqual(200, response.status_code)

    def test_get_users_count(self):
        """test get user endpoint"""
        response = self.client.get(self.url)
        self.assertTrue(len(json.loads(response.content)) == User.objects.count())

    def test_get_users(self):
        """test get user endpoint"""
        response = self.client.get(self.url)
        res = UserSerializer(User.objects.all(), many=True).data
        self.assertEqual(json.loads(response.content), res)

    def test_update_user(self):
        """test update user endpoint"""
        response = self.client.put(self.url, {"id": -1, "name": "James Vinc"})
        self.assertEqual(json.loads(response.content), {'message': 'incorrect id'})

        response = self.client.put(self.url, {"id": self.james.id, "name": "James Vinc"})
        self.assertEqual(200, response.status_code)

    def test_delete_user(self):
        """test delete user endpoint"""
        response = self.client.delete(self.url, {"id": -1})
        self.assertEqual(json.loads(response.content), {'message': 'incorrect id'})

        response = self.client.delete(self.url, {"id": self.james.id})
        self.assertEqual(200, response.status_code)


class BoardTest(APITestCase):
    """ Test module for Board View"""
    url = reverse("api:board")

    def setUp(self):
        self.james = User.objects.create(name="james")
        self.board1 = Board.objects.create(title="board1", board_owner_id=self.james)

    def test_create_board(self):
        """test create board endpoint"""
        response = self.client.post(self.url, {"title": "James Vinc"})
        self.assertEqual(400, response.status_code)

        response = self.client.post(self.url, {"title": "James Vinc", "board_owner_id": self.james.id})
        self.assertEqual(200, response.status_code)

    def test_get_board_count(self):
        """test get board endpoint count"""
        response = self.client.get(self.url)
        self.assertTrue(len(json.loads(response.content)) == Board.objects.count())

    def test_get_board(self):
        """test get board endpoint output"""
        response = self.client.get(self.url)
        res = BoardSerializer(Board.objects.all(), many=True).data
        self.assertEqual(json.loads(response.content), res)

    def test_update_user(self):
        """test update board endpoint"""
        response = self.client.put(self.url, {"id": -1, "title": "board2"})
        self.assertEqual(json.loads(response.content), {'message': 'incorrect id'})

        response = self.client.put(self.url,
                                   {"id": self.board1.id, "title": "board1 update",
                                    "board_owner_id": self.board1.board_owner_id.id})
        self.assertEqual(200, response.status_code)

    def test_delete_user(self):
        """test delete user endpoint"""
        response = self.client.delete(self.url, {"id": -1})
        self.assertEqual(json.loads(response.content), {'message': 'incorrect id'})

        response = self.client.delete(self.url, {"id": self.board1.id})
        self.assertEqual(200, response.status_code)


class ListTest(APITestCase):
    """ Test module for List View"""
    url = reverse("api:list")

    def setUp(self):
        self.james = User.objects.create(name="james")
        self.board1 = Board.objects.create(title="board1", board_owner_id=self.james)
        self.list1 = List.objects.create(title="list1", board_id=self.board1)

    def test_create_list(self):
        """test create list endpoint"""
        response = self.client.post(self.url, {"title": "James Vince list"})
        self.assertEqual(400, response.status_code)

        response1 = self.client.post(self.url, {"title": "James Vince list", "board_id": self.board1.id})
        self.assertEqual(200, response1.status_code)

        response2 = self.client.post(self.url, {"title": "James Vince list2", "board_id": self.board1.id})
        self.assertEqual(200, response2.status_code)
        list_order = list()
        list_order.append(json.loads(response1.content)["response"]["id"])
        list_order.append(json.loads(response2.content)["response"]["id"])
        self.assertEqual(Board.objects.get(id=self.board1.id).list_order, list_order)

    def test_delete_list(self):
        """test delete list endpoint"""
        response = self.client.delete(self.url, {"id": -1})
        self.assertEqual(json.loads(response.content), {'message': 'incorrect id'})
        response2 = self.client.post(self.url, {"title": "James Vince list2", "board_id": self.board1.id})

        response = self.client.delete(self.url, {"id": json.loads(response2.content)["response"]["id"]})
        self.assertEqual(200, response.status_code)

        self.assertEqual(Board.objects.get(id=self.board1.id).list_order, [])


class CardTest(APITestCase):
    """ Test module for Card View"""
    url = reverse("api:card")

    def setUp(self):
        self.james = User.objects.create(name="james")
        self.board1 = Board.objects.create(title="board1", board_owner_id=self.james)
        self.list1 = List.objects.create(title="list1", board_id=self.board1)
        self.card1 = Card.objects.create(title="card1", list_id=self.list1)

    def test_create_list(self):
        """test create card endpoint"""
        response = self.client.post(self.url, {"title": "James Vince card"})
        self.assertEqual(400, response.status_code)

        response1 = self.client.post(self.url, {"title": "James Vince card1", "list_id": self.list1.id})
        self.assertEqual(200, response1.status_code)

        response2 = self.client.post(self.url, {"title": "James Vince card2", "list_id": self.list1.id})
        self.assertEqual(200, response2.status_code)
        card_order = list()
        card_order.append(json.loads(response1.content)["response"]["id"])
        card_order.append(json.loads(response2.content)["response"]["id"])
        self.assertEqual(List.objects.get(id=self.list1.id).card_order, card_order)

    def test_delete_list(self):
        """test delete card endpoint"""
        response = self.client.delete(self.url, {"id": -1})
        self.assertEqual(json.loads(response.content), {'message': 'incorrect id'})
        response2 = self.client.post(self.url, {"title": "James Vince card", "list_id": self.list1.id})

        response = self.client.delete(self.url, {"id": json.loads(response2.content)["response"]["id"]})
        self.assertEqual(200, response.status_code)

        self.assertEqual(List.objects.get(id=self.list1.id).card_order, [])


class ListAndBoardTest(APITestCase):
    """ Test module for Board and List View"""
    url = reverse("api:board")
    url2 = reverse("api:list")

    def setUp(self):
        self.james = User.objects.create(name="james")
        self.board1 = Board.objects.create(title="board1", board_owner_id=self.james)

    def test_update_user(self):
        """test reorder Lists"""

        self.client.post(self.url2, {"title": "James Vince list", "board_id": self.board1.id})
        self.client.post(self.url2, {"title": "James Vince list2", "board_id": self.board1.id})
        list_order = Board.objects.get(id=self.board1.id).list_order

        list_order.reverse()

        self.client.put(self.url,
                        {"id": self.board1.id, "title": "board1 update",
                         "board_owner_id": self.board1.board_owner_id.id, "list_order": list_order})
        self.assertEqual(Board.objects.get(id=self.board1.id).list_order, list_order)
