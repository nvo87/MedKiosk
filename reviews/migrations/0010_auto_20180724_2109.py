# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-07-24 18:09
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0009_auto_20171226_1458'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='answer',
            name='comment',
        ),
        migrations.RemoveField(
            model_name='answer',
            name='rating',
        ),
    ]