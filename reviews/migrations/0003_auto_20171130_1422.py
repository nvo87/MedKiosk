# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-11-30 11:22
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0002_auto_20170918_1410'),
    ]

    operations = [
        migrations.CreateModel(
            name='Option',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=300)),
            ],
            options={
                'verbose_name': 'Вариант ответа',
                'verbose_name_plural': 'Варианты ответов',
            },
        ),
        migrations.AddField(
            model_name='question',
            name='nesting_level',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='option',
            name='next_question_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='parent_options', to='reviews.Question'),
        ),
        migrations.AddField(
            model_name='option',
            name='question_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reviews.Question'),
        ),
        migrations.AddField(
            model_name='answer',
            name='option',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='reviews.Option'),
        ),
    ]
