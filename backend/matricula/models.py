from django.db import models
from usuarios.models import Persona,Sede
# Create your models here.


class Anual(models.Model):
    descripcion = models.CharField(max_length=50)

    def __str__(self):
        return self.descripcion

    class Meta:
        ordering = ["id"]


class Materias(models.Model):
    codigo = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=250)

    def __str__(self):
        return self.descripcion

    class Meta:
        ordering = ["id"]


class Grados(models.Model):
    nombre_grado = models.CharField(max_length=250,null=True)
    anual = models.ForeignKey(Anual,on_delete=models.CASCADE,null=True)
    sede = models.ForeignKey(Sede,on_delete=models.CASCADE,null=True)
    estudiantes = models.ManyToManyField(Persona)
    profesor = models.ForeignKey(Persona,related_name="persona_profesor",on_delete=models.CASCADE)
    docenteapoyo = models.ForeignKey(Persona, related_name="persona_docenteapoyo", on_delete=models.CASCADE,null=True)
    docenteorienta = models.ForeignKey(Persona, related_name="persona_docenteorienta", on_delete=models.CASCADE,null=True)

    def __str__(self):
        return self.descripcion

    class Meta:
        ordering = ["id"]


class Docente_Materia(models.Model):
    materias = models.ManyToManyField(Materias)
    id_grado = models.ForeignKey(Grados,related_name="docente_grado",on_delete=models.CASCADE)
    profesor = models.ForeignKey(Persona, related_name="profesor_materia", on_delete=models.CASCADE)

    def __str__(self):
        return self.descripcion

    class Meta:
        ordering = ["id"]


class Diagnostico(models.Model):
    descripcion = models.TextField(null=True)
    persona = models.ForeignKey(Persona, related_name="persona_diagnostico", on_delete=models.CASCADE)

    def __str__(self):
        return self.descripcion

    class Meta:
        ordering = ["id"]


class Piar(models.Model):
    nombre = models.CharField(max_length=250,null=True)
    anual = models.ForeignKey(Anual,on_delete=models.CASCADE,null=True)
    sede = models.ForeignKey(Sede,on_delete=models.CASCADE,null=True)
    grado = models.ForeignKey(Grados, on_delete=models.CASCADE, null=True)
    estudiante = models.ForeignKey(Persona,related_name="persona_piar",on_delete=models.CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True,null=True)
    updatedAt = models.DateTimeField(auto_now=True,null=True)
    soporte = models.FileField(upload_to='PIAR/', null=True, blank=True)
    def __str__(self):
        return self.nombre

    class Meta:
        ordering = ["id"]


class Contextogenaral(models.Model):
    descripacion = models.TextField(max_length=250,null=True)
    familiar = models.TextField(max_length=250, null=True)
    otros = models.TextField(max_length=250, null=True)
    piar = models.ForeignKey(Piar,related_name="piar_contexto",on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

    class Meta:
        ordering = ["id"]


class Valoracionpedagogica(models.Model):
    competencias = models.TextField(max_length=250,null=True)
    principales = models.TextField(max_length=250, null=True)
    estado = models.TextField(max_length=250, null=True)
    piar = models.ForeignKey(Piar,related_name="piar_valoracion",on_delete=models.CASCADE)

    def __str__(self):
        return self.competencias

    class Meta:
        ordering = ["id"]


class Objetivos(models.Model):
    metas = models.TextField(null=True)
    evaluacion = models.TextField(null=True)
    piar = models.ForeignKey(Piar,related_name="piar_objetivos",on_delete=models.CASCADE)
    materia = models.ForeignKey(Materias, related_name="piar_materias", on_delete=models.CASCADE)

    def __str__(self):
        return self.metas

    class Meta:
        ordering = ["id"]


class Razonables(models.Model):
    ajustes = models.TextField(null=True)
    didacticos = models.TextField(null=True)
    evaluacion = models.TextField(null=True)
    adicionales = models.TextField(null=True)
    casa = models.TextField(null=True)
    piar = models.ForeignKey(Piar,related_name="piar_rasonnables",on_delete=models.CASCADE)
    materia = models.ForeignKey(Materias, related_name="razonables_materia", on_delete=models.CASCADE)

    def __str__(self):
        return self.ajustes

    class Meta:
        ordering = ["id"]
