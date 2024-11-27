# Generated by Django 5.1.2 on 2024-11-15 00:58

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('matricula', '0007_alter_diagnostico_descripcion'),
        ('usuarios', '0006_modulogrupopermiso_sedegp'),
    ]

    operations = [
        migrations.CreateModel(
            name='Piar',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=250, null=True)),
                ('anual', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='matricula.anual')),
                ('estudiante', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='persona_piar', to='usuarios.persona')),
                ('grado', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='matricula.grados')),
                ('sede', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='usuarios.sede')),
            ],
            options={
                'ordering': ['id'],
            },
        ),
    ]