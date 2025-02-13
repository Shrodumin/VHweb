from django.contrib import admin

# Register your models here.

import api.models

admin.site.register(api.models.Realisation)
admin.site.register(api.models.Post)