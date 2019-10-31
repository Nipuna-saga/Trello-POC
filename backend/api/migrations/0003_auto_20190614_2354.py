# Generated by Django 2.2.2 on 2019-06-14 23:54

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20190614_0548'),
    ]

    operations = [
        migrations.AlterField(
            model_name='board',
            name='list_order',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), default=[], size=None),
        ),
        migrations.AlterField(
            model_name='list',
            name='card_order',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), default=[], size=None),
        ),
    ]