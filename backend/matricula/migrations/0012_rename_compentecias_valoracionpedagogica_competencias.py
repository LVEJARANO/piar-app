# Generated by Django 5.1.2 on 2024-11-19 02:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('matricula', '0011_rename_competecias_valoracionpedagogica_compentecias'),
    ]

    operations = [
        migrations.RenameField(
            model_name='valoracionpedagogica',
            old_name='compentecias',
            new_name='competencias',
        ),
    ]
