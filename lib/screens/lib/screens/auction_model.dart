class AuctionModel {
  final String title;
  final String category;
  final String weight;
  final String price;
  final String city;
  final String endTime;
  final int bidsCount;

  AuctionModel({
    required this.title,
    required this.category,
    required this.weight,
    required this.price,
    required this.city,
    required this.endTime,
    required this.bidsCount,
  });
}
