# Generated by Django 5.1.2 on 2024-11-18 21:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('matricula', '0010_valoracionpedagogica'),
    ]

    operations = [
        migrations.RenameField(
            model_name='valoracionpedagogica',
            old_name='competecias',
            new_name='compentecias',
        ),
    ]
