from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission

# Create your models here.


class UserManager(BaseUserManager):

    def _create_user(self, username, email, password, is_staff, is_superuser, **extra_fields):
        if not email:
            raise ValueError('El email es obligatorio')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, is_active=False, is_staff=is_staff, is_superuser=is_superuser,
                          **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email, password=None, **extra_fields):
        return self._create_user(username, email, password, False, False, **extra_fields)

    def create_superuser(self, username, email, password, **kwargs):
        account = self.create_user(username, email, password, **kwargs)

        account.is_admin = True
        account.is_staff = True
        account.is_superuser = True
        account.is_verified = True
        account.is_active = True
        account.save()
        return account


class Modulo(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

    class Meta:
        ordering = ["id"]



class Catalago(models.Model):
    tipo = models.CharField(max_length=50)
    opcion = models.CharField(max_length=200)

    def __str__(self):
        return str(self.tipo + " - " + self.opcion)

    class Meta:
        ordering = ["opcion"]

class Pais(models.Model):
    nombre = models.CharField(max_length=200)
    codigo = models.CharField(max_length=50)
    nacionalidad = models.CharField(max_length=150, null=True)


    def __str__(self):
        return self.nombre

    class Meta:
        ordering = ["id"]


class Departamento(models.Model):
    pais = models.ForeignKey(Pais, related_name='departamento_pais', on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    codigo = models.CharField(max_length=50, null=True)

    def __str__(self):
        return str(self.nombre + " - " + self.pais.nombre)

    class Meta:
        ordering = ["id"]


class Municipio(models.Model):
    departamento = models.ForeignKey(Departamento, related_name='departamento_municipio', on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    codigo = models.CharField(max_length=50, null=True)

    def __str__(self):
        return str(self.nombre + " - " + self.departamento.nombre)

    class Meta:
        ordering = ["nombre"]


class Persona(models.Model):
    tipo_documento = models.CharField(max_length=255)
    documento = models.CharField(max_length=20, unique=True)
    fecha_expedicion_doc = models.DateField(blank=True, null=True)
    primer_nombre = models.CharField(max_length=100)
    segundo_nombre = models.CharField(max_length=100, blank=True, null=True)
    primer_apellido = models.CharField(max_length=100)
    segundo_apellido = models.CharField(max_length=100, blank=True, null=True)
    fecha_nacimiento = models.DateField()
    sexo = models.CharField(max_length=255)
    etnia = models.CharField(max_length=255,null=True)
    victima= models.CharField(max_length=255,null=True)
    discapacidad = models.CharField(max_length=255, null=True)
    acudiente = models.CharField(max_length=255, null=True,blank=True)
    rol = models.CharField(max_length=255,null=True)
    correo = models.CharField(max_length=100, null=True, blank=True)
    telefono = models.CharField(max_length=60, null=True, blank=True)
    municipio_nacimiento = models.ForeignKey(Municipio, related_name='municipio_nacimiento', on_delete=models.CASCADE)
    municipio_expedicion = models.ForeignKey(Municipio, related_name='municipio_expedicion', on_delete=models.CASCADE,
                                           default=1)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.documento + " - " + self.primer_nombre + "-" + self.primer_apellido)

    class Meta:
        ordering = ["-id"]


class Usuario(AbstractBaseUser, PermissionsMixin):
    username = models.CharField('Nombre de usuario', max_length=50, unique=True, blank=True, null=True)
    email = models.EmailField('Email', max_length=50, blank=True, null=True)
    first_name = models.CharField(max_length=100, null=True, blank=True)
    last_name = models.CharField(max_length=100, null=True, blank=True)
    persona = models.OneToOneField(Persona, on_delete=models.CASCADE)
    usu_ultimo_acceso = models.DateTimeField(auto_now=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    objects = UserManager()

    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_gsec = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def get_full_name(self):
        pass

    def get_short_name(self):
        return self.username

    def __str__(self):
        return self.username

    def __str__(self):
        return str(self.persona.documento + " - " + self.persona.primer_nombre + "-" + self.persona.primer_apellido)

    class Meta:
        ordering = ["id"]

class SubModulo(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

    class Meta:
        ordering = ["id"]


class Sede(models.Model):
    descripcion = models.CharField(max_length=250)
    direccion = models.CharField(max_length=250,null=True)
    telefono = models.CharField(max_length=250,null=True)

    def __str__(self):
        return self.descripcion

    class Meta:
        ordering = ["id"]


class ModuloGrupoPermiso(models.Model):
    modulo = models.ManyToManyField(Modulo)
    submodulo = models.ManyToManyField(SubModulo, related_name='submodulo_modulo')
    grupodj = models.ManyToManyField(Group, related_name='grupos_extendidos')
    sedegp = models.ManyToManyField(Sede, related_name='grupos_sede')
    user = models.OneToOneField(Usuario, related_name="modulo_gpo_permiso", on_delete=models.CASCADE)

    def __str__(self):
        return f"Permisos: {self.user.persona.primer_nombre} {self.user.persona.primer_apellido} - {self.user.persona.documento}"

    class Meta:
        ordering = ["id"]