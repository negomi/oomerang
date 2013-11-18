# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' ,  name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# TEST USERS:
seeker1 = User.create([{name: 'Joe Bloggs', email: 'jbloggs@bloggs.com', username: 'jblogs', password: 'mrbloggs'}])
seeker2 = User.create([{name: 'Jack Daniels', email: 'smooth@whiskey.com', username: 'theman', password: 'thedrink'}])
seeker3 = User.create([{name: 'Dos Equis', email: 'xx@idontoften.com', username: 'interesting', password: 'world'}])
seeker4 = User.create([{name: 'Jimmy Hoffa', email: 'jhoffa@missing.com', username: 'findme', password: 'please'}])

finder1 = User.create([{name: 'Adrian Monk', email: 'monk@ocd.com', username: 'amonk', password: 'wetwipe'}])
finder2 = User.create([{name: 'Sherlock Holmes', email: 'sholmes@deduce.com', username: 'sherlock', password: 'watson'}])
finder3 = User.create([{name: 'John Smith', email: 'john@smith.com', username: 'jsmith', password: 'hello'}])
finder4 = User.create([{name: 'Julian Assange', email: 'x3fH7ttek@wikileaks.org', username: 'username', password: 'password'}])


# TEST CATEGORIES:
cat1 = Category.create([{name: 'Watches', parent_id: 0}])
cat2 = Category.create([{name: 'Electronics', parent_id: 0}])
cat3 = Category.create([{name: 'Wrist Watches', parent_id: 1}])
cat4 = Category.create([{name: 'Pocket Watches', parent_id: 1}])
cat5 = Category.create([{name: 'Phones', parent_id: 2}])
cat6 = Category.create([{name: 'Laptops', parent_id: 2}])
cat7 = Category.create([{name: 'Analog', parent_id: 3}])
cat8 = Category.create([{name: 'Digital', parent_id: 3}])
cat9 = Category.create([{name: 'iPhone5', parent_id: 5}])
cat10 = Category.create([{name: 'Samsung S3', parent_id: 5}])
cat11 = Category.create([{name: 'Acer 9000', parent_id: 6}])
cat12 = Category.create([{name: 'Ames Silver', parent_id: 4}])


# TEST LOCATIONS:
loc1 = Location.create([{latitude: 37.779894, longtitude: -122.394879, date: '2013/11/11', time: '16:58', details: 'General Assembly'}])
loc2 = Location.create([{latitude: 37.777930, longtitude: -122.389240, date: '2013/11/11', time: '14:58', details: 'AT&T Ballpark'}])
loc3 = Location.create([{latitude: 37.778818, longtitude: -122.417307, date: '2013/11/10', time: '14:32', details: 'Civic Center'}])
loc4 = Location.create([{latitude: 37.778818, longtitude: -122.417307, date: '2013/11/8', time: '11:32', details: 'Civic Center'}])
loc5 = Location.create([{latitude: 37.785737, longtitude: -122.393961, date: '2013/11/8', time: '16:58', details: 'Exploratorium, SF - handed into the front-desk.'}])
loc6 = Location.create([{latitude: 37.785737, longtitude: -122.393961, date: '2013/11/12', time: '09:58', details: 'Levi Strauss Inc. offices'}])
loc7 = Location.create([{latitude: 37.808621, longtitude: -122.476950, date: '2013/11/01', time: '09:18', details: 'washed-up onshore near Golden Gate Bridge.'}])


# TEST ITEMS:
item1 = Item.create([{category_id: 12, location_id: 1, status: 'lost', seeker_id: 1, color: 'silver', title: 'Pocket Watch', details: 'I lost an Ames brand pocket watch with a white face at General Assembly, 414 Brannon St., San Francisco'}])
item2 = Item.create([{category_id: 8, location_id: 2, status: 'found', seeker_id: 2, color: 'you confirm', title: 'Digital Watch', details: 'I found a black digital watch at AT&T Park', secret_info: 'Black Casio digital watch, scratch on bezel.'}])
item3 = Item.create([{category_id: 9, location_id: 4, status: 'lost', seeker_id: 3, color: 'white', title: 'iPhone5', details: 'I lost a white iPhone 5 at Civic Center'}])
item4 = Item.create([{category_id: 9, location_id: 3, status: 'found', finder_id: 5, color: 'white', title: 'iPhone5', details: 'I found a white iPhone 5 at Civic Center', secret_info: 'Serial # 123456789ABC, iPhone5, Hello Kitty case.'}])
item5 = Item.create([{category_id: 10, location_id: 3, status: 'lost', seeker_id: 4, color: 'white', title: 'Samsung phone', details: 'Lost my Samsung S3 at The Civic Center.'}])
item6 = Item.create([{category_id: 11, location_id: 5, status: 'found', finder_id: 8, color: 'black & silver', title: 'Hot Laptop', details: 'I found an Acer 9000 government laptop at The Exploratorium, San Francisco.', secret_info: 'Encrypted HDD, Label stating property of the CIA.'}])
item7 = Item.create([{category_id: 12, location_id: 6, status: 'found', finder_id: 7, color: 'silver', title: 'Old-style pocket watch', details: 'Found: silver pocket-watch at the Levi Strauss company offices. Contact security.', secret_info: 'Ames brand, White face, two hands, silver chain'}])
item8 = Item.create([{category_id: 7, location_id: 7, status: 'found', finder_id: 6, color: 'white', title: 'Damaged old watch', details: 'Found a wrist-watch under the entrance to the Golden Gate Bridge, San Francisco, CA', secret_info: 'Enscryption on back: To Jimmy From The Mob.'}])
