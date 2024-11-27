# Generated by Django 5.1.2 on 2024-10-29 02:10

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('usuarios', '0003_modulo_submodulo_programagrupopermiso'),
    ]

    operations = [
        migrations.CreateModel(
            name='ModuloGrupoPermiso',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('grupodj', models.ManyToManyField(related_name='grupos_extendidos', to='auth.group')),
                ('modulo', models.ManyToManyField(to='usuarios.modulo')),
                ('submodulo', models.ManyToManyField(related_name='submodulo_modulo', to='usuarios.submodulo')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='modulo_gpo_permiso', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['id'],
            },
        ),
        migrations.DeleteModel(
            name='ProgramaGrupoPermiso',
        ),
    ]
