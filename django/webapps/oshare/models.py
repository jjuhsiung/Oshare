class Order(models.Model):
	user = models.ForeignKey('User', on_delete=models.CASCADE)
	total = models.IntegerField(default=0)
	ship_addr = models.CharField(max_length=100)
	order_time = models.DateTimeField()

class Cart(models.Model):
	user = models.ForeignKey('User', on_delete=models.CASCADE)
	total = models.IntegerField(default=0)

