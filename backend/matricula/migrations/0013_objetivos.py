# Generated by Django 5.1.2 on 2024-11-19 04:04

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('matricula', '0012_rename_compentecias_valoracionpedagogica_competencias'),
    ]

    operations = [
        migrations.CreateModel(
            name='Objetivos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('metas', models.TextField(null=True)),
                ('evaluacion', models.TextField(null=True)),
                ('materia', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='piar_materias', to='matricula.materias')),
                ('piar', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='piar_objetivos', to='matricula.piar')),
            ],
            options={
                'ordering': ['id'],
            },
        ),
    ]
