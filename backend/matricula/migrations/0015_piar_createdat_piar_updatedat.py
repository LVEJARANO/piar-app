# Generated by Django 5.1.2 on 2024-11-20 14:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('matricula', '0014_razonables'),
    ]

    operations = [
        migrations.AddField(
            model_name='piar',
            name='createdAt',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='piar',
            name='updatedAt',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]