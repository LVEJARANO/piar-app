# Generated by Django 5.1.2 on 2024-10-23 16:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Catalago',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo', models.CharField(max_length=50)),
                ('opcion', models.CharField(max_length=200)),
            ],
            options={
                'ordering': ['opcion'],
            },
        ),
    ]
