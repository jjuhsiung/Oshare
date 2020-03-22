from django.db import models

# Create your models here.
class UserModel(models.Model):
    first_name = models.CharField(max_length=30, default='')
    last_name = models.CharField(max_length=30, default='')
    username = models.CharField(max_length=30, default='')
    email = models.CharField(max_length=60)
    phone = models.IntegerField(max_length=15)
    address = models.CharField(max_length=60)
    password = models.CharField(max_length = 100)
    profile_picture = models.ImageField(
        upload_to="images/", default="images/profile.png")

    def __str__(self):
        return 'id=' + str(self.id) + ', name=' + self.first_name+" " + self.last_name + ", username=" + self.username
    

class FollowModel(models.Model):
    follower = models.ForeignKey(
        UserModel, related_name="who_follows", on_delete=models.CASCADE)
    followed = models.ForeignKey(
        UserModel, related_name="who_is_followed", on_delete=models.CASCADE)
    follow_time = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return '{} follows {}'.format(self.follower, self.followed) + ' at ' + str(self.follow_time)
