# Generated by Django 5.1.2 on 2024-10-29 02:02

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('usuarios', '0002_catalago'),
    ]

    operations = [
        migrations.CreateModel(
            name='Modulo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
            ],
            options={
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='SubModulo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50)),
            ],
            options={
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='ProgramaGrupoPermiso',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('grupodj', models.ManyToManyField(related_name='grupos_extendidos', to='auth.group')),
                ('modulo', models.ManyToManyField(to='usuarios.modulo')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='programa_gpo_permiso', to=settings.AUTH_USER_MODEL)),
                ('submodulo', models.ManyToManyField(related_name='submodulo_modulo', to='usuarios.submodulo')),
            ],
            options={
                'ordering': ['id'],
            },
        ),
    ]
