# Generated by Django 3.2.5 on 2021-08-21 03:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_cartitem_total_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='address',
            field=models.TextField(blank=True, max_length=100, null=True),
        ),
    ]