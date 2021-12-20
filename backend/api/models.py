from django.db import models

# Create your models here.
class Products(models.Model):
    name = models.CharField(max_length=200)
    price = models.IntegerField()
    image = models.CharField(max_length=200,default=False)
    def __str__(self):
        return self.name