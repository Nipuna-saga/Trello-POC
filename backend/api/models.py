from django.db import models
from django.contrib.postgres.fields import ArrayField


class User(models.Model):
    """Dummy user without username password"""
    name = models.CharField("name", max_length=20)
    created = models.DateTimeField("create", auto_now_add=True)

    def __str__(self):
        return self.name


class Board(models.Model):
    """Board model"""
    title = models.CharField("title", max_length=20)
    board_owner = models.ForeignKey("User", name="board_owner_id", on_delete=models.CASCADE)
    list_order = ArrayField(models.IntegerField(), default=list)
    created = models.DateTimeField("create", auto_now_add=True)

    def __str__(self):
        return self.title


class List(models.Model):
    """List model"""
    title = models.CharField("title", max_length=20)
    board = models.ForeignKey("Board", name="board_id", on_delete=models.CASCADE)
    card_order = ArrayField(models.IntegerField(), default=list)
    created = models.DateTimeField("create", auto_now_add=True)

    def __str__(self):
        return self.title


class Card(models.Model):
    """Card Model"""
    title = models.CharField("title", max_length=20)
    list = models.ForeignKey("List", name="list_id", on_delete=models.CASCADE)
    description = models.TextField("description", null=True, blank=True)
    due_date = models.DateTimeField("due_date", null=True, blank=True)
    created = models.DateTimeField("create", auto_now_add=True)

    def __str__(self):
        return self.title
