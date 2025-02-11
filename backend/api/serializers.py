from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Post
from .models import Realisation


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def Create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = ["id", "title", "content", "image", "created_at"]
        extra_kwargs = {
            "image": {"required": False},
            "created_at": {"read_only": True},
            "content": {"required": False}
        }

class RealisationSerializer(serializers.HyperlinkedModelSerializer):
    posts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Realisation
        fields = ["id", "title", "posts", "image"]
        extra_kwargs = {
            "image": {"required": False}
        }

class HomePageSerializer(serializers.Serializer):
    posts = PostSerializer(many=True, read_only=True)
    realisations = RealisationSerializer(many=True, read_only=True)

    class Meta:
        fields = ["posts", "realisations"]