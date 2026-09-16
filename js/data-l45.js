/* ===========================================================
   宝贝背单词小助手 · 词库（二）
   牛津自然拼读世界 4 级（辅音组合）+ 5 级（字母组合）
   字段说明见 data-l23.js
   =========================================================== */

const W45 = [
  /* ---------- Level 4 · bl ---------- */
  { w:'black', cn:'黑色的', e:'⬛', L:4, p:'bl', c:'bl/a/ck', hc:[0], ps:'adj.', d:'The colour of the night sky.', x:'My cat is black.', z:'我的猫是黑色的。' },
  { w:'blocks', cn:'积木', e:'🧱', L:4, p:'bl', c:'bl/o/ck/s', hc:[0], ps:'n.', d:'Small boxes you play and build with.', x:'I build a tall tower with blocks.', z:'我用积木搭了一座高塔。' },
  { w:'blanket', cn:'毯子', e:'🛏️', L:4, p:'bl', c:'bl/a/n/k/e/t', hc:[0], ps:'n.', d:'A soft cover that keeps you warm in bed.', x:'My blanket is warm.', z:'我的毯子很暖和。' },

  /* ---------- Level 4 · cl ---------- */
  { w:'clock', cn:'闹钟', e:'⏰', L:4, p:'cl', c:'cl/o/ck', hc:[0], ps:'n.', d:'A thing that tells you the time.', x:'The clock says eight.', z:'闹钟指着八点。' },
  { w:'cloud', cn:'云', e:'☁️', L:4, p:'cl', c:'cl/ou/d', hc:[0], ps:'n.', d:'White or gray thing in the sky that makes rain.', x:'That cloud looks like a sheep.', z:'那朵云像一只小羊。' },
  { w:'clown', cn:'小丑', e:'🤡', L:4, p:'cl', c:'cl/ow/n', hc:[0], ps:'n.', d:'A funny person in a show.', x:'The clown makes me laugh.', z:'小丑让我哈哈大笑。' },
  { w:'clean', cn:'干净的', e:'🧽', L:4, p:'cl', c:'cl/ea/n', hc:[0], ps:'adj.', d:'Not dirty.', x:'My hands are clean now.', z:'我的手现在很干净。' },

  /* ---------- Level 4 · fl ---------- */
  { w:'flag', cn:'旗帜', e:'🚩', L:4, p:'fl', c:'fl/a/g', hc:[0], ps:'n.', d:'A piece of cloth with a colour or picture.', x:'The flag is red.', z:'这面旗子是红色的。' },
  { w:'flower', cn:'花', e:'🏵️', L:5, p:'er', c:'fl/ow/er', hc:[2], ps:'n.', d:'The pretty part of a plant.', x:'This flower smells nice.', z:'这朵花很香。' },
  { w:'fly', cn:'苍蝇', e:'🪰', L:5, p:'y', c:'fl/y', hc:[1], ps:'n.', d:'A small insect with wings.', x:'A fly is on the window.', z:'一只苍蝇在窗户上。' },
  { w:'flute', cn:'长笛', e:'🎶', L:4, p:'fl', c:'fl/u/t/e', hc:[0], ps:'n.', d:'A long music thing you blow.', x:'She plays the flute.', z:'她会吹长笛。' },

  /* ---------- Level 4 · gl ---------- */
  { w:'glass', cn:'玻璃杯', e:'🥛', L:4, p:'gl', c:'gl/a/ss', hc:[0], ps:'n.', d:'A cup made of hard clear material.', x:'A glass of water, please.', z:'请给我一杯水。' },
  { w:'gloves', cn:'手套', e:'🧤', L:4, p:'gl', c:'gl/o/v/es', hc:[0], ps:'n.', d:'Things you wear on your hands.', x:'Wear your gloves, it is cold.', z:'天冷，戴上手套。' },
  { w:'globe', cn:'地球仪', e:'🌍', L:4, p:'gl', c:'gl/o/b/e', hc:[0], ps:'n.', d:'A round model of the world.', x:'I can find China on the globe.', z:'我在地球仪上能找到中国。' },

  /* ---------- Level 4 · pl ---------- */
  { w:'plant', cn:'植物', e:'🪴', L:4, p:'pl', c:'pl/a/n/t', hc:[0], ps:'n.', d:'Something that grows in the ground.', x:'The plant needs water.', z:'植物需要水。' },
  { w:'plate', cn:'盘子', e:'🍽️', L:4, p:'pl', c:'pl/a/t/e', hc:[0], ps:'n.', d:'A flat thing you put food on.', x:'My plate is empty!', z:'我的盘子空啦！' },
  { w:'plus', cn:'加', e:'➕', L:4, p:'pl', c:'pl/u/s', hc:[0], ps:'prep.', d:'Put together with, like 1 + 1.', x:'Two plus two is four.', z:'二加二等于四。' },

  /* ---------- Level 4 · sl ---------- */
  { w:'sleep', cn:'睡觉', e:'😴', L:4, p:'sl', c:'sl/ee/p', hc:[0], ps:'v.', d:'To close your eyes and rest at night.', x:'I sleep at nine o clock.', z:'我九点睡觉。' },
  { w:'slow', cn:'慢的', e:'🐢', L:4, p:'sl', c:'sl/ow', hc:[0], ps:'adj.', d:'Not fast.', x:'The turtle is very slow.', z:'乌龟走得很慢。' },
  { w:'sled', cn:'雪橇', e:'🛷', L:4, p:'sl', c:'sl/e/d', hc:[0], ps:'n.', d:'A thing you ride on snow.', x:'We go down the hill on a sled.', z:'我们坐雪橇滑下山坡。' },

  /* ---------- Level 4 · br ---------- */
  { w:'brush', cn:'刷子', e:'🪥', L:4, p:'br', c:'br/u/sh', hc:[0], ps:'n.', d:'A thing with small hairs for cleaning.', x:'Brush your teeth every day.', z:'每天都要刷牙。' },
  { w:'bridge', cn:'桥', e:'🌉', L:4, p:'br', c:'br/i/d/ge', hc:[0], ps:'n.', d:'Something you walk on to go over water.', x:'We walk over the bridge.', z:'我们走过这座桥。' },
  { w:'brother', cn:'哥哥', e:'👦', L:5, p:'er', c:'br/o/th/er', hc:[3], ps:'n.', d:'A boy who has the same parents as you.', x:'My brother is tall.', z:'我的哥哥很高。' },

  /* ---------- Level 4 · cr ---------- */
  { w:'crab', cn:'螃蟹', e:'🦀', L:4, p:'cr', c:'cr/a/b', hc:[0], ps:'n.', d:'A sea animal with ten legs and big claws.', x:'The crab walks side by side.', z:'螃蟹横着走。' },
  { w:'crayon', cn:'蜡笔', e:'🖍️', L:4, p:'cr', c:'cr/a/y/on', hc:[0], ps:'n.', d:'A coloured stick you draw with.', x:'I draw with a green crayon.', z:'我用绿色蜡笔画画。' },
  { w:'crown', cn:'王冠', e:'👑', L:4, p:'cr', c:'cr/ow/n', hc:[0], ps:'n.', d:'A pretty thing a king or queen wears on the head.', x:'The crown is made of gold.', z:'王冠是金子做的。' },
  { w:'cry', cn:'哭', e:'😭', L:5, p:'y', c:'cr/y', hc:[1], ps:'v.', d:'To have water come from your eyes.', x:'Do not cry, I am here.', z:'别哭，我在呢。' },

  /* ---------- Level 4 · dr ---------- */
  { w:'drum', cn:'鼓', e:'🥁', L:4, p:'dr', c:'dr/u/m', hc:[0], ps:'n.', d:'A music thing you hit with sticks.', x:'He plays the drum well.', z:'他鼓打得很棒。' },
  { w:'dress', cn:'连衣裙', e:'👗', L:4, p:'dr', c:'dr/e/ss', hc:[0], ps:'n.', d:'Clothes a girl wears.', x:'Her dress is pink.', z:'她的连衣裙是粉色的。' },
  { w:'dragon', cn:'龙', e:'🐉', L:4, p:'dr', c:'dr/a/g/on', hc:[0], ps:'n.', d:'A big animal in old stories that can fly.', x:'The dragon has big wings.', z:'龙有巨大的翅膀。' },
  { w:'drink', cn:'喝', e:'🥤', L:4, p:'dr', c:'dr/i/n/k', hc:[0], ps:'v.', d:'To put water or juice in your mouth.', x:'Drink some water, please.', z:'请喝点水。' },

  /* ---------- Level 4 · fr ---------- */
  { w:'frog', cn:'青蛙', e:'🐸', L:4, p:'fr', c:'fr/o/g', hc:[0], ps:'n.', d:'A small green animal that jumps.', x:'A frog can jump high.', z:'青蛙跳得很高。' },
  { w:'friend', cn:'朋友', e:'🧑‍🤝‍🧑', L:4, p:'fr', c:'fr/ie/nd', hc:[0], ps:'n.', d:'A person you like to play with.', x:'You are my best friend.', z:'你是我最好的朋友。' },
  /* ---------- Level 4 · gr ---------- */
  { w:'grass', cn:'小草', e:'🌿', L:4, p:'gr', c:'gr/a/ss', hc:[0], ps:'n.', d:'The green plant that covers the ground.', x:'Do not run on the grass.', z:'不要在草地上跑。' },
  { w:'grandma', cn:'奶奶', e:'👵', L:4, p:'gr', c:'gr/a/nd/m/a', hc:[0], ps:'n.', d:'The mother of your mum or dad.', x:'My grandma makes nice food.', z:'我奶奶做的饭很好吃。' },

  /* ---------- Level 4 · pr ---------- */
  { w:'present', cn:'礼物', e:'🎁', L:4, p:'pr', c:'pr/e/s/e/nt', hc:[0], ps:'n.', d:'Something you give to someone.', x:'This present is for you.', z:'这个礼物送给你。' },
  { w:'prince', cn:'王子', e:'🤴', L:4, p:'pr', c:'pr/i/n/ce', hc:[0], ps:'n.', d:'The son of a king or queen.', x:'The prince has a white horse.', z:'王子有一匹白马。' },
  { w:'princess', cn:'公主', e:'👸', L:4, p:'pr', c:'pr/i/n/ce/ss', hc:[0], ps:'n.', d:'The daughter of a king or queen.', x:'The princess is very kind.', z:'这位公主很善良。' },
  { w:'prize', cn:'奖品', e:'🥇', L:4, p:'pr', c:'pr/i/z/e', hc:[0], ps:'n.', d:'Something you win in a game.', x:'You get a prize for the game.', z:'你玩游戏得到了奖品。' },

  /* ---------- Level 4 · tr ---------- */
  { w:'truck', cn:'卡车', e:'🚚', L:4, p:'tr', c:'tr/u/ck', hc:[0], ps:'n.', d:'A big car that carries heavy things.', x:'The truck is full of boxes.', z:'卡车装满了箱子。' },
  { w:'triangle', cn:'三角形', e:'🔺', L:4, p:'tr', c:'tr/i/an/gle', hc:[0], ps:'n.', d:'A shape with three straight sides.', x:'This red triangle is a flag.', z:'这个红色的三角形是一面旗。' },
  { w:'trousers', cn:'裤子', e:'👖', L:4, p:'tr', c:'tr/ou/s/er/s', hc:[0], ps:'n.', d:'Clothes you wear on your legs.', x:'My trousers are too long.', z:'我的裤子太长了。' },

  /* ---------- Level 4 · sc / sk ---------- */
  { w:'scarf', cn:'围巾', e:'🧣', L:4, p:'sc', c:'sc/ar/f', hc:[0], ps:'n.', d:'A warm thing you wear around your neck.', x:'Put on your scarf.', z:'把围巾戴上。' },
  { w:'scooter', cn:'滑板车', e:'🛴', L:4, p:'sc', c:'sc/oo/t/er', hc:[0], ps:'n.', d:'A thing with wheels you push and ride.', x:'I ride my scooter to the park.', z:'我骑滑板车去公园。' },
  { w:'school', cn:'学校', e:'🏫', L:4, p:'sc', c:'sc/h/oo/l', hc:[0], ps:'n.', d:'The place where children learn.', x:'I go to school every day.', z:'我每天去上学。' },
  { w:'skirt', cn:'短裙', e:'👗', L:5, p:'ir', c:'sk/ir/t', hc:[1], ps:'n.', d:'Clothes a girl wears around her waist.', x:'Her skirt is blue.', z:'她的短裙是蓝色的。' },
  { w:'skate', cn:'滑冰', e:'🛹', L:4, p:'sk', c:'sk/a/t/e', hc:[0], ps:'v.', d:'To move on ice or roads with special boots.', x:'I can skate on the ice.', z:'我会在冰上滑冰。' },
  { w:'sky', cn:'天空', e:'🌌', L:5, p:'y', c:'sk/y', hc:[1], ps:'n.', d:'The space above you where clouds are.', x:'Look at the sky at night.', z:'晚上的时候看看天空。' },
  { w:'skip', cn:'跳绳', e:'🤸', L:4, p:'sk', c:'sk/i/p', hc:[0], ps:'v.', d:'To jump again and again over a rope.', x:'Let us skip in the garden.', z:'我们去院子里跳绳吧。' },

  /* ---------- Level 4 · sm / sn / sp / st / sw / tw ---------- */
  { w:'small', cn:'小的', e:'🐜', L:5, p:'al', c:'sm/all', hc:[1], ps:'adj.', d:'Not big.', x:'A mouse is small.', z:'老鼠很小。' },
  { w:'smoke', cn:'烟', e:'💨', L:4, p:'sm', c:'sm/o/k/e', hc:[0], ps:'n.', d:'The gray air that comes from a fire.', x:'I can see smoke over there.', z:'我能看见那边有烟。' },
  { w:'smart', cn:'聪明的', e:'🧠', L:4, p:'sm', c:'sm/ar/t', hc:[0], ps:'adj.', d:'Good at learning things.', x:'You are a smart kid.', z:'你是个聪明的孩子。' },
  { w:'snack', cn:'点心', e:'🍪', L:4, p:'sn', c:'sn/a/ck', hc:[0], ps:'n.', d:'A small thing you eat between meals.', x:'Here is a snack for you.', z:'给你一份小点心。' },
  { w:'snowman', cn:'雪人', e:'⛄', L:3, p:'ow', c:'sn/ow/m/a/n', hc:[1], ps:'n.', d:'A person made of snow.', x:'We make a snowman in winter.', z:'冬天我们堆雪人。' },
  { w:'spoon', cn:'勺子', e:'🥄', L:5, p:'oo', c:'sp/oo/n', hc:[1], ps:'n.', d:'A thing you use to eat soup.', x:'I eat soup with a spoon.', z:'我用勺子喝汤。' },
  { w:'spider', cn:'蜘蛛', e:'🕷️', L:5, p:'er', c:'sp/i/d/er', hc:[3], ps:'n.', d:'A small animal with eight legs.', x:'A spider is in the corner.', z:'角落里有一只蜘蛛。' },
  { w:'spring', cn:'春天', e:'🌼', L:4, p:'sp', c:'sp/r/i/ng', hc:[0], ps:'n.', d:'The time of year when flowers grow.', x:'Flowers come out in spring.', z:'春天花儿开了。' },
  { w:'space', cn:'太空', e:'🚀', L:4, p:'sp', c:'sp/a/ce', hc:[0], ps:'n.', d:'The big place above the sky with stars.', x:'A rocket goes into space.', z:'火箭飞进太空。' },
  { w:'star', cn:'星星', e:'⭐', L:5, p:'ar', c:'st/ar', hc:[1], ps:'n.', d:'A small light in the night sky.', x:'I can see many stars.', z:'我能看到很多星星。' },
  { w:'stamp', cn:'邮票', e:'📮', L:4, p:'st', c:'st/a/mp', hc:[0], ps:'n.', d:'A small paper you put on a letter.', x:'I put a stamp on the envelope.', z:'我在信封上贴邮票。' },
  { w:'stop', cn:'停下', e:'🛑', L:4, p:'st', c:'st/o/p', hc:[0], ps:'v.', d:'To not move any more.', x:'Stop at the red light.', z:'红灯要停下来。' },
  { w:'stick', cn:'棍子', e:'🥢', L:4, p:'st', c:'st/i/ck', hc:[0], ps:'n.', d:'A long thin piece of wood.', x:'The dog runs after the stick.', z:'小狗去追那根棍子。' },
  { w:'strawberry', cn:'草莓', e:'🍓', L:4, p:'st', c:'st/r/aw/b/er/ry', hc:[0], ps:'n.', d:'A small sweet red fruit with dots.', x:'Strawberry cake is my favourite.', z:'草莓蛋糕是我的最爱。' },
  { w:'swan', cn:'天鹅', e:'🦢', L:4, p:'sw', c:'sw/a/n', hc:[0], ps:'n.', d:'A big white bird with a long neck.', x:'The swan swims on the lake.', z:'天鹅在湖里游。' },
  { w:'swim', cn:'游泳', e:'🏊', L:4, p:'sw', c:'sw/i/m', hc:[0], ps:'v.', d:'To move in water with your body.', x:'I can swim very well.', z:'我游泳游得很好。' },
  { w:'sweet', cn:'甜的', e:'🍭', L:4, p:'sw', c:'sw/ee/t', hc:[0], ps:'adj.', d:'Tasting like sugar.', x:'This candy is too sweet.', z:'这颗糖太甜了。' },
  { w:'sweater', cn:'毛衣', e:'🧶', L:5, p:'ea', c:'sw/ea/t/er', hc:[1], ps:'n.', d:'Warm clothes you wear on top.', x:'My sweater is warm and soft.', z:'我的毛衣又暖又软。' },
  { w:'twelve', cn:'十二', e:'🕛', L:4, p:'tw', c:'tw/e/lve', hc:[0], ps:'num.', d:'The number 12.', x:'A year has twelve months.', z:'一年有十二个月。' },
  { w:'twin', cn:'双胞胎', e:'👯', L:4, p:'tw', c:'tw/i/n', hc:[0], ps:'n.', d:'Two children born at the same time.', x:'They are twins.', z:'他们是双胞胎。' },
  { w:'twenty', cn:'二十', e:'2️⃣0️⃣', L:4, p:'tw', c:'tw/e/nt/y', hc:[0], ps:'num.', d:'The number 20.', x:'I can count to twenty.', z:'我能数到二十。' },
  { w:'twist', cn:'扭一扭', e:'🌀', L:4, p:'tw', c:'tw/i/st', hc:[0], ps:'v.', d:'To turn something round and round.', x:'Twist the cap to open it.', z:'扭一扭盖子就能打开。' },

  /* ---------- Level 4 · digraphs sh / ch / th / wh / ph / ck ---------- */
  { w:'ship', cn:'轮船', e:'🚢', L:4, p:'sh', c:'sh/i/p', hc:[0], ps:'n.', d:'A big boat that goes on the sea.', x:'The ship is very big.', z:'这艘轮船很大。' },
  { w:'shoe', cn:'鞋子', e:'👟', L:4, p:'sh', c:'sh/oe', hc:[0], ps:'n.', d:'A thing you wear on your foot.', x:'My shoes are new.', z:'我的鞋子是新的。' },
  { w:'shirt', cn:'衬衫', e:'👕', L:5, p:'ir', c:'sh/ir/t', hc:[1], ps:'n.', d:'Clothes you wear on the top of your body.', x:'Your shirt is very nice.', z:'你的衬衫很好看。' },
  { w:'shell', cn:'贝壳', e:'🐚', L:4, p:'sh', c:'sh/e/ll', hc:[0], ps:'n.', d:'The hard thing around a sea animal.', x:'I found a pink shell.', z:'我找到一个粉色贝壳。' },
  { w:'shark', cn:'鲨鱼', e:'🦈', L:5, p:'ar', c:'sh/ar/k', hc:[1], ps:'n.', d:'A big sea animal with sharp teeth.', x:'A shark can swim very fast.', z:'鲨鱼游得很快。' },
  { w:'fish', cn:'小鱼', e:'🐟', L:4, p:'sh', c:'f/i/sh', hc:[2], ps:'n.', d:'An animal that lives in water.', x:'The fish is in the water.', z:'小鱼在水里。' },
  { w:'chair', cn:'椅子', e:'🪑', L:5, p:'air', c:'ch/air', hc:[1], ps:'n.', d:'Something you sit on.', x:'Sit on the chair, please.', z:'请坐在椅子上。' },
  { w:'chicken', cn:'小鸡', e:'🐓', L:4, p:'ch', c:'ch/i/ck/en', hc:[0], ps:'n.', d:'A farm bird that gives us eggs.', x:'The chicken is on the farm.', z:'小鸡在农场里。' },
  { w:'cherry', cn:'樱桃', e:'🍒', L:4, p:'ch', c:'ch/e/rr/y', hc:[0], ps:'n.', d:'A small round red fruit.', x:'Cherries are red and sweet.', z:'樱桃又红又甜。' },
  { w:'chocolate', cn:'巧克力', e:'🍫', L:4, p:'ch', c:'ch/o/c/o/l/a/te', hc:[0], ps:'n.', d:'A sweet brown food.', x:'I like chocolate milk.', z:'我喜欢巧克力牛奶。' },
  { w:'lunch', cn:'午饭', e:'🍱', L:4, p:'ch', c:'l/u/n/ch', hc:[3], ps:'n.', d:'The food you eat in the middle of the day.', x:'We eat lunch at twelve.', z:'我们十二点吃午饭。' },
  { w:'watch', cn:'手表', e:'⌚', L:4, p:'ch', c:'w/a/t/ch', hc:[3], ps:'n.', d:'A small clock you wear on your arm.', x:'My watch is green.', z:'我的手表是绿色的。' },
  { w:'thumb', cn:'大拇指', e:'👍', L:4, p:'th', c:'th/u/mb', hc:[0], ps:'n.', d:'The short thick finger on your hand.', x:'I have two thumbs.', z:'我有两个大拇指。' },
  { w:'think', cn:'思考', e:'🤔', L:4, p:'th', c:'th/i/n/k', hc:[0], ps:'v.', d:'To use your head to work something out.', x:'Think about it and tell me.', z:'想一想再告诉我。' },
  { w:'teeth', cn:'牙齿', e:'🦷', L:4, p:'th', c:'t/ee/th', hc:[2], ps:'n.', d:'The hard white parts in your mouth.', x:'Brush your teeth at night.', z:'晚上要刷牙。' },
  { w:'bath', cn:'洗澡', e:'🛁', L:4, p:'th', c:'b/a/th', hc:[2], ps:'n.', d:'Washing your whole body in water.', x:'I take a bath before bed.', z:'我睡前洗澡。' },
  { w:'mother', cn:'妈妈', e:'👩', L:5, p:'er', c:'m/o/th/er', hc:[3], ps:'n.', d:'Your mum.', x:'My mother loves me.', z:'妈妈很爱我。' },
  { w:'father', cn:'爸爸', e:'👨‍🦱', L:5, p:'er', c:'f/a/th/er', hc:[3], ps:'n.', d:'Your dad.', x:'My father works in a school.', z:'我爸爸在学校工作。' },
  { w:'whistle', cn:'哨子', e:'📣', L:4, p:'wh', c:'wh/i/st/le', hc:[0], ps:'n.', d:'A small thing you blow to make a loud sound.', x:'The teacher has a whistle.', z:'老师有一个哨子。' },
  { w:'why', cn:'为什么', e:'❓', L:5, p:'y', c:'wh/y', hc:[1], ps:'adv.', d:'For what reason.', x:'Why are you laughing?', z:'你为什么笑呀？' },
  { w:'photo', cn:'照片', e:'📷', L:4, p:'ph', c:'ph/o/t/o', hc:[0], ps:'n.', d:'A picture you take with a camera.', x:'Let us take a photo here.', z:'我们在这里拍张照片吧。' },
  { w:'dolphin', cn:'海豚', e:'🐬', L:4, p:'ph', c:'d/o/l/ph/i/n', hc:[3], ps:'n.', d:'A clever sea animal that jumps.', x:'The dolphin jumps out of the water.', z:'海豚跳出水面。' },
  { w:'elephant', cn:'大象', e:'🐘', L:4, p:'ph', c:'e/l/e/ph/a/nt', hc:[3], ps:'n.', d:'A very big gray animal with a long nose.', x:'An elephant has a long trunk.', z:'大象有长长的鼻子。' },
  { w:'duck', cn:'鸭子', e:'🦆', L:4, p:'ck', c:'d/u/ck', hc:[2], ps:'n.', d:'A bird that swims in water.', x:'The duck is in the pond.', z:'鸭子在池塘里。' },
  { w:'sock', cn:'袜子', e:'🧦', L:4, p:'ck', c:'s/o/ck', hc:[2], ps:'n.', d:'A soft thing you wear on your foot.', x:'Where is my other sock?', z:'我另一只袜子在哪里？' },
  { w:'rock', cn:'岩石', e:'🪨', L:4, p:'ck', c:'r/o/ck', hc:[2], ps:'n.', d:'A big hard stone.', x:'We sit on a big rock.', z:'我们坐在一块大岩石上。' },
  { w:'neck', cn:'脖子', e:'🦒', L:4, p:'ck', c:'n/e/ck', hc:[2], ps:'n.', d:'The part between your head and body.', x:'The giraffe has a long neck.', z:'长颈鹿的脖子很长。' },
  { w:'chick', cn:'小鸡', e:'🐥', L:4, p:'ck', c:'ch/i/ck', hc:[2], ps:'n.', d:'A baby chicken.', x:'The chick is very small.', z:'小鸡很小。' },

  /* ---------- Level 4 · 结尾组合 nd / nt / mp / st / nk / ng / lk / ft ---------- */
  { w:'hand', cn:'手', e:'✋', L:4, p:'nd', c:'h/a/nd', hc:[2], ps:'n.', d:'The part of your body you hold things with.', x:'Wash your hands before you eat.', z:'吃饭前要洗手。' },
  { w:'tent', cn:'帐篷', e:'⛺', L:4, p:'nt', c:'t/e/nt', hc:[2], ps:'n.', d:'A house made of cloth for camping.', x:'We sleep in a tent.', z:'我们在帐篷里睡觉。' },
  { w:'jump', cn:'跳', e:'🤾', L:4, p:'mp', c:'j/u/mp', hc:[2], ps:'v.', d:'To push yourself up into the air.', x:'I can jump very high.', z:'我能跳得很高。' },
  { w:'nest', cn:'鸟巢', e:'🪹', L:4, p:'st', c:'n/e/st', hc:[2], ps:'n.', d:'The home a bird makes for its eggs.', x:'There are eggs in the nest.', z:'鸟巢里有蛋。' },
  { w:'pink', cn:'粉色的', e:'🩷', L:4, p:'nk', c:'p/i/nk', hc:[2], ps:'adj.', d:'A soft light red colour.', x:'My bag is pink.', z:'我的书包是粉色的。' },
  { w:'king', cn:'国王', e:'👑', L:4, p:'ng', c:'k/i/ng', hc:[2], ps:'n.', d:'A man who rules a country.', x:'The king lives in a big castle.', z:'国王住在大城堡里。' },
  { w:'milk', cn:'牛奶', e:'🐮', L:4, p:'lk', c:'m/i/lk', hc:[2], ps:'n.', d:'A white drink that comes from cows.', x:'I drink milk every morning.', z:'我每天早上喝牛奶。' },
  { w:'lamp', cn:'台灯', e:'🪔', L:4, p:'mp', c:'l/a/mp', hc:[2], ps:'n.', d:'A light you put on a table.', x:'Turn on the lamp, please.', z:'请把台灯打开。' },
  { w:'ring', cn:'戒指', e:'💍', L:4, p:'ng', c:'r/i/ng', hc:[2], ps:'n.', d:'A round thing you wear on your finger.', x:'The ring is very pretty.', z:'这枚戒指很漂亮。' },
  { w:'song', cn:'歌曲', e:'🎵', L:4, p:'ng', c:'s/o/ng', hc:[2], ps:'n.', d:'Music with words you can sing.', x:'Let us sing a happy song.', z:'我们唱一首欢快的歌吧。' },
  { w:'wing', cn:'翅膀', e:'🪽', L:4, p:'ng', c:'w/i/ng', hc:[2], ps:'n.', d:'The part a bird uses to fly.', x:'A bird has two wings.', z:'小鸟有一对翅膀。' },
  { w:'desk', cn:'书桌', e:'🗄️', L:4, p:'sk', c:'d/e/sk', hc:[2], ps:'n.', d:'A table you write and read at.', x:'My books are on the desk.', z:'我的书在书桌上。' },
  { w:'wind', cn:'风', e:'🌪️', L:4, p:'nd', c:'w/i/nd', hc:[2], ps:'n.', d:'Air that moves.', x:'The wind is strong today.', z:'今天风很大。' },

  /* ---------- Level 5 · ar / or ---------- */
  { w:'car', cn:'小汽车', e:'🚗', L:5, p:'ar', c:'c/ar', hc:[1], ps:'n.', d:'A thing with four wheels that people drive.', x:'My car is red.', z:'我的小汽车是红色的。' },
  { w:'farm', cn:'农场', e:'🚜', L:5, p:'ar', c:'f/ar/m', hc:[1], ps:'n.', d:'Land where people grow food and keep animals.', x:'There are ducks on the farm.', z:'农场里有鸭子。' },
  { w:'park', cn:'公园', e:'⛲', L:5, p:'ar', c:'p/ar/k', hc:[1], ps:'n.', d:'A place with grass and trees where you play.', x:'Let us go to the park.', z:'我们去公园吧。' },
  { w:'garden', cn:'花园', e:'🌷', L:5, p:'ar', c:'g/ar/d/en', hc:[1], ps:'n.', d:'A place with flowers near your home.', x:'Grandma waters the garden.', z:'奶奶给花园浇水。' },
  { w:'card', cn:'卡片', e:'🃏', L:5, p:'ar', c:'c/ar/d', hc:[1], ps:'n.', d:'A small piece of hard paper.', x:'I make a card for mum.', z:'我给妈妈做了一张卡片。' },
  { w:'arm', cn:'胳膊', e:'💪', L:5, p:'ar', c:'ar/m', hc:[0], ps:'n.', d:'The part of your body between the shoulder and hand.', x:'I have two strong arms.', z:'我有两条强壮的胳膊。' },
  { w:'horse', cn:'马', e:'🐎', L:5, p:'or', c:'h/or/se', hc:[1], ps:'n.', d:'A big animal you can ride.', x:'The horse runs fast.', z:'马跑得很快。' },
  { w:'fork', cn:'叉子', e:'🍴', L:5, p:'or', c:'f/or/k', hc:[1], ps:'n.', d:'A thing you use to eat.', x:'I eat with a fork.', z:'我用叉子吃饭。' },
  { w:'corn', cn:'玉米', e:'🌽', L:5, p:'or', c:'c/or/n', hc:[1], ps:'n.', d:'A yellow food that grows on a tall plant.', x:'Corn is sweet and yellow.', z:'玉米又甜又黄。' },
  { w:'storm', cn:'暴风雨', e:'⛈️', L:5, p:'or', c:'st/or/m', hc:[1], ps:'n.', d:'Very bad weather with wind and rain.', x:'Do not go out in the storm.', z:'暴风雨时不要出门。' },
  { w:'short', cn:'短的', e:'📐', L:5, p:'or', c:'sh/or/t', hc:[1], ps:'adj.', d:'Not long.', x:'My hair is short.', z:'我的头发很短。' },
  { w:'morning', cn:'早上', e:'🌅', L:5, p:'or', c:'m/or/n/ing', hc:[1], ps:'n.', d:'The time when the sun comes up.', x:'Good morning, everyone!', z:'大家早上好！' },
  { w:'orange', cn:'橙子', e:'🍊', L:5, p:'or', c:'or/an/ge', hc:[0], ps:'n.', d:'A round fruit with a thick skin.', x:'An orange is sweet.', z:'橙子很甜。' },

  /* ---------- Level 5 · er / ir / ur ---------- */
  { w:'water', cn:'水', e:'🚰', L:5, p:'er', c:'w/a/t/er', hc:[3], ps:'n.', d:'The clear thing we drink.', x:'Drink more water, please.', z:'请多喝水。' },
  { w:'tiger', cn:'老虎', e:'🐯', L:5, p:'er', c:'t/i/g/er', hc:[3], ps:'n.', d:'A big wild cat with stripes.', x:'The tiger is very strong.', z:'老虎很强壮。' },
  { w:'sister', cn:'姐姐', e:'👧', L:5, p:'er', c:'s/i/st/er', hc:[3], ps:'n.', d:'A girl who has the same parents as you.', x:'My sister helps me.', z:'我姐姐帮我。' },
  { w:'teacher', cn:'老师', e:'🧑‍🏫', L:5, p:'er', c:'t/ea/ch/er', hc:[3], ps:'n.', d:'A person who helps children learn.', x:'My teacher is very kind.', z:'我的老师很温柔。' },
  { w:'winter', cn:'冬天', e:'🥶', L:5, p:'er', c:'w/i/n/t/er', hc:[3], ps:'n.', d:'The cold time of year with snow.', x:'It snows in winter.', z:'冬天会下雪。' },
  { w:'summer', cn:'夏天', e:'😎', L:5, p:'er', c:'s/u/mm/er', hc:[3], ps:'n.', d:'The hot time of year.', x:'We swim in summer.', z:'夏天我们游泳。' },
  { w:'dinner', cn:'晚饭', e:'🍛', L:5, p:'er', c:'d/i/nn/er', hc:[3], ps:'n.', d:'The food you eat in the evening.', x:'Dinner is ready!', z:'晚饭好啦！' },
  { w:'letter', cn:'信', e:'📧', L:5, p:'er', c:'l/e/tt/er', hc:[3], ps:'n.', d:'Words you write and send to someone.', x:'I write a letter to my friend.', z:'我给朋友写了一封信。' },
  { w:'bird', cn:'小鸟', e:'🕊️', L:5, p:'ir', c:'b/ir/d', hc:[1], ps:'n.', d:'An animal with wings that can fly.', x:'A bird is singing in the tree.', z:'一只小鸟在树上唱歌。' },
  { w:'girl', cn:'女孩', e:'🎀', L:5, p:'ir', c:'g/ir/l', hc:[1], ps:'n.', d:'A female child.', x:'The girl has a red ball.', z:'那个女孩有一个红球。' },
  { w:'thirty', cn:'三十', e:'3️⃣0️⃣', L:5, p:'ir', c:'th/ir/t/y', hc:[1], ps:'num.', d:'The number 30.', x:'A month has thirty days.', z:'一个月有三十天。' },
  { w:'circle', cn:'圆圈', e:'⭕', L:5, p:'ir', c:'c/ir/c/le', hc:[1], ps:'n.', d:'A round shape.', x:'Draw a circle and a star.', z:'画一个圆圈和一颗星。' },
  { w:'turtle', cn:'海龟', e:'🐢', L:5, p:'ur', c:'t/ur/t/le', hc:[1], ps:'n.', d:'An animal with a hard shell on its back.', x:'The turtle walks slowly.', z:'海龟慢慢地走。' },
  { w:'purple', cn:'紫色的', e:'🟣', L:5, p:'ur', c:'p/ur/p/le', hc:[1], ps:'adj.', d:'A colour made of red and blue.', x:'I have a purple crayon.', z:'我有一支紫色蜡笔。' },
  { w:'nurse', cn:'护士', e:'👩‍⚕️', L:5, p:'ur', c:'n/ur/se', hc:[1], ps:'n.', d:'A person who helps sick people.', x:'The nurse is very kind.', z:'护士很温柔。' },
  { w:'turn', cn:'转弯', e:'🔄', L:5, p:'ur', c:'t/ur/n', hc:[1], ps:'v.', d:'To move in a different way.', x:'Turn left at the school.', z:'在学校那里向左转。' },
  { w:'purse', cn:'钱包', e:'👛', L:5, p:'ur', c:'p/ur/se', hc:[1], ps:'n.', d:'A small bag for money.', x:'Mum has a red purse.', z:'妈妈有一个红色钱包。' },

  /* ---------- Level 5 · oo / ou / ow / oi / oy ---------- */
  { w:'moon', cn:'月亮', e:'🌕', L:5, p:'oo', c:'m/oo/n', hc:[1], ps:'n.', d:'The big light in the night sky.', x:'The moon is round tonight.', z:'今晚月亮是圆的。' },
  { w:'zoo', cn:'动物园', e:'🦁', L:5, p:'oo', c:'z/oo', hc:[1], ps:'n.', d:'A place with many wild animals.', x:'We go to the zoo on Sunday.', z:'我们周日去动物园。' },
  { w:'food', cn:'食物', e:'🥗', L:5, p:'oo', c:'f/oo/d', hc:[1], ps:'n.', d:'What people and animals eat.', x:'This food smells good.', z:'这个食物闻起来很香。' },
  { w:'balloon', cn:'气球', e:'🎈', L:5, p:'oo', c:'b/a/ll/oo/n', hc:[3], ps:'n.', d:'A bag of air you can play with.', x:'My balloon is red.', z:'我的气球是红色的。' },
  { w:'boot', cn:'靴子', e:'👢', L:5, p:'oo', c:'b/oo/t', hc:[1], ps:'n.', d:'A tall shoe that keeps your feet dry.', x:'Put on your boots in the rain.', z:'下雨天要穿靴子。' },
  { w:'room', cn:'房间', e:'🚪', L:5, p:'oo', c:'r/oo/m', hc:[1], ps:'n.', d:'A place inside a house.', x:'My room is small and nice.', z:'我的房间又小又温馨。' },
  { w:'book', cn:'书', e:'📚', L:5, p:'oo', c:'b/oo/k', hc:[1], ps:'n.', d:'Pages with words inside a cover.', x:'I read a book every day.', z:'我每天读一本书。' },
  { w:'foot', cn:'脚', e:'👣', L:5, p:'oo', c:'f/oo/t', hc:[1], ps:'n.', d:'The part of your body you stand on.', x:'My foot hurts a little.', z:'我的脚有点疼。' },
  { w:'cook', cn:'做饭', e:'🧑‍🍳', L:5, p:'oo', c:'c/oo/k', hc:[1], ps:'v.', d:'To make food hot and ready to eat.', x:'Dad can cook noodles.', z:'爸爸会煮面条。' },
  { w:'look', cn:'看', e:'👀', L:5, p:'oo', c:'l/oo/k', hc:[1], ps:'v.', d:'To use your eyes.', x:'Look at the beautiful moon.', z:'看看美丽的月亮。' },
  { w:'house', cn:'房子', e:'🏡', L:5, p:'ou', c:'h/ou/se', hc:[1], ps:'n.', d:'A building where people live.', x:'Our house is near the park.', z:'我们家在公园附近。' },
  { w:'mouse', cn:'小老鼠', e:'🐭', L:5, p:'ou', c:'m/ou/se', hc:[1], ps:'n.', d:'A very small animal with a long tail.', x:'A mouse is in the kitchen.', z:'厨房里有一只老鼠。' },
  { w:'mouth', cn:'嘴巴', e:'👄', L:5, p:'ou', c:'m/ou/th', hc:[1], ps:'n.', d:'The part of your face you eat with.', x:'Open your mouth and say ah.', z:'张开嘴说“啊”。' },
  { w:'mountain', cn:'高山', e:'⛰️', L:5, p:'ou', c:'m/ou/n/t/ain', hc:[1], ps:'n.', d:'A very high hill.', x:'The mountain is very high.', z:'这座山很高。', b:['ket','pet'] },
  { w:'count', cn:'数一数', e:'🔢', L:5, p:'ou', c:'c/ou/nt', hc:[1], ps:'v.', d:'To say numbers one by one.', x:'Count the apples for me.', z:'帮我数一数苹果。' },
  { w:'cow', cn:'奶牛', e:'🐄', L:5, p:'ow', c:'c/ow', hc:[1], ps:'n.', d:'A big farm animal that gives milk.', x:'The cow is eating grass.', z:'奶牛在吃草。' },
  { w:'brown', cn:'棕色的', e:'🟤', L:5, p:'ow', c:'br/ow/n', hc:[1], ps:'adj.', d:'The colour of chocolate.', x:'The bear is brown.', z:'小熊是棕色的。' },
  { w:'town', cn:'小镇', e:'🏘️', L:5, p:'ow', c:'t/ow/n', hc:[1], ps:'n.', d:'A place with many houses and shops.', x:'We live in a small town.', z:'我们住在一个小镇上。' },
  { w:'tower', cn:'高塔', e:'🗼', L:5, p:'ow', c:'t/ow/er', hc:[1], ps:'n.', d:'A tall building.', x:'The tower is very high.', z:'这座塔很高。' },
  { w:'coin', cn:'硬币', e:'🪙', L:5, p:'oi', c:'c/oi/n', hc:[1], ps:'n.', d:'A small round piece of money.', x:'I have three coins.', z:'我有三枚硬币。' },
  { w:'oil', cn:'油', e:'🛢️', L:5, p:'oi', c:'oi/l', hc:[0], ps:'n.', d:'A thick liquid used for cooking.', x:'Mum puts oil in the pot.', z:'妈妈在锅里放油。' },
  { w:'point', cn:'指一指', e:'👉', L:5, p:'oi', c:'p/oi/nt', hc:[1], ps:'v.', d:'To show something with your finger.', x:'Point to the blue car.', z:'指一指那辆蓝色的车。' },
  { w:'boy', cn:'男孩', e:'👦', L:5, p:'oy', c:'b/oy', hc:[1], ps:'n.', d:'A male child.', x:'The boy runs very fast.', z:'那个男孩跑得很快。' },
  { w:'toy', cn:'玩具', e:'🧸', L:5, p:'oy', c:'t/oy', hc:[1], ps:'n.', d:'Something children play with.', x:'My favourite toy is a bear.', z:'我最喜欢的玩具是小熊。' },
  { w:'joy', cn:'快乐', e:'🎉', L:5, p:'oy', c:'j/oy', hc:[1], ps:'n.', d:'A happy feeling.', x:'Jump for joy!', z:'开心地跳起来吧！' },

  /* ---------- Level 5 · au / aw / al ---------- */
  { w:'sauce', cn:'酱汁', e:'🥫', L:5, p:'au', c:'s/au/ce', hc:[1], ps:'n.', d:'A thick liquid you put on food.', x:'I like tomato sauce.', z:'我喜欢番茄酱。' },
  { w:'autumn', cn:'秋天', e:'🍂', L:5, p:'au', c:'au/tu/mn', hc:[0], ps:'n.', d:'The time of year when leaves fall.', x:'Leaves turn yellow in autumn.', z:'秋天树叶变黄了。' },
  { w:'restaurant', cn:'餐厅', e:'🥘', L:5, p:'au', c:'r/e/st/au/r/ant', hc:[3], ps:'n.', d:'A place where you buy and eat food.', x:'We eat in a restaurant today.', z:'我们今天在餐厅吃饭。', b:['ket'] },
  { w:'draw', cn:'画画', e:'✏️', L:5, p:'aw', c:'dr/aw', hc:[1], ps:'v.', d:'To make a picture with a pencil.', x:'I can draw a cat.', z:'我会画小猫。' },
  { w:'saw', cn:'锯子', e:'🪚', L:5, p:'aw', c:'s/aw', hc:[1], ps:'n.', d:'A tool with sharp teeth for cutting wood.', x:'Dad has a big saw.', z:'爸爸有一把大锯子。' },
  { w:'paw', cn:'爪子', e:'🐾', L:5, p:'aw', c:'p/aw', hc:[1], ps:'n.', d:'The foot of a cat or dog.', x:'The cat has soft paws.', z:'猫的爪子很软。' },
  { w:'straw', cn:'吸管', e:'🥤', L:5, p:'aw', c:'st/r/aw', hc:[2], ps:'n.', d:'A thin tube for drinking.', x:'I drink juice with a straw.', z:'我用吸管喝果汁。' },
  { w:'ball', cn:'球', e:'⚽', L:5, p:'al', c:'b/all', hc:[1], ps:'n.', d:'A round thing you play with.', x:'Let us play with the ball.', z:'我们一起玩球吧。' },
  { w:'tall', cn:'高的', e:'📈', L:5, p:'al', c:'t/all', hc:[1], ps:'adj.', d:'Higher than other things.', x:'My dad is very tall.', z:'我爸爸很高。' },
  { w:'wall', cn:'墙', e:'🧱', L:5, p:'al', c:'w/all', hc:[1], ps:'n.', d:'The side of a room or building.', x:'The picture is on the wall.', z:'画挂在墙上。' },
  { w:'walk', cn:'走路', e:'🚶', L:5, p:'al', c:'w/al/k', hc:[1], ps:'v.', d:'To move with your feet slowly.', x:'We walk to school together.', z:'我们一起走路去学校。' },
  { w:'fall', cn:'落下', e:'🍁', L:5, p:'al', c:'f/all', hc:[1], ps:'v.', d:'To go down suddenly.', x:'Leaves fall in autumn.', z:'秋天叶子会落下来。' },

  /* ---------- Level 5 · ea 读短音 e / ear / air / are / ure ---------- */
  { w:'bread', cn:'面包', e:'🍞', L:5, p:'ea', c:'br/ea/d', hc:[1], ps:'n.', d:'A food made from flour that you bake.', x:'I eat bread with milk.', z:'我吃面包配牛奶。' },
  { w:'weather', cn:'天气', e:'🌦️', L:5, p:'ea', c:'w/ea/th/er', hc:[1], ps:'n.', d:'How hot, cold, wet or windy it is outside.', x:'The weather is nice today.', z:'今天天气很好。', b:['ket','pet'] },
  { w:'feather', cn:'羽毛', e:'🪶', L:5, p:'ea', c:'f/ea/th/er', hc:[1], ps:'n.', d:'A soft light thing that covers a bird.', x:'A bird has soft feathers.', z:'小鸟的羽毛很柔软。' },
  { w:'heavy', cn:'重的', e:'🏋️', L:5, p:'ea', c:'h/ea/v/y', hc:[1], ps:'adj.', d:'Weighing a lot.', x:'This box is too heavy.', z:'这个箱子太重了。' },
  { w:'ear', cn:'耳朵', e:'👂', L:5, p:'ear', c:'ear', hc:[0], ps:'n.', d:'The part of your body you hear with.', x:'A rabbit has two long ears.', z:'兔子有两只长耳朵。' },
  { w:'hear', cn:'听见', e:'🎧', L:5, p:'ear', c:'h/ear', hc:[1], ps:'v.', d:'To know a sound with your ears.', x:'I can hear a bird.', z:'我能听见小鸟叫。' },
  { w:'year', cn:'年', e:'🗓️', L:5, p:'ear', c:'y/ear', hc:[1], ps:'n.', d:'Twelve months.', x:'Happy New Year!', z:'新年快乐！' },
  { w:'near', cn:'近的', e:'📍', L:5, p:'ear', c:'n/ear', hc:[1], ps:'adj.', d:'Not far away.', x:'The shop is near my home.', z:'商店离我家很近。' },
  { w:'dear', cn:'亲爱的', e:'💌', L:5, p:'ear', c:'d/ear', hc:[1], ps:'adj.', d:'Loved very much.', x:'Dear mum, I love you.', z:'亲爱的妈妈，我爱你。' },
  { w:'hair', cn:'头发', e:'💇', L:5, p:'air', c:'h/air', hc:[1], ps:'n.', d:'The soft thing on your head.', x:'Her hair is long and black.', z:'她的头发又长又黑。' },
  { w:'stairs', cn:'楼梯', e:'🪜', L:5, p:'air', c:'st/air/s', hc:[1], ps:'n.', d:'Steps that go up in a building.', x:'Go up the stairs slowly.', z:'慢慢地上楼梯。' },
  { w:'fairy', cn:'仙女', e:'🧚', L:5, p:'air', c:'f/air/y', hc:[1], ps:'n.', d:'A small magic person in stories.', x:'The fairy has pretty wings.', z:'仙女有漂亮的翅膀。' },
  { w:'airport', cn:'机场', e:'🛫', L:5, p:'air', c:'air/p/or/t', hc:[0], ps:'n.', d:'The place where planes take off.', x:'We meet dad at the airport.', z:'我们去机场接爸爸。', b:['ket'] },
  { w:'square', cn:'正方形', e:'🟥', L:5, p:'are', c:'squ/are', hc:[1], ps:'n.', d:'A shape with four straight sides.', x:'A box is a square.', z:'盒子是正方形的。' },
  { w:'share', cn:'分享', e:'🤝', L:5, p:'are', c:'sh/are', hc:[1], ps:'v.', d:'To give part of something to others.', x:'Let us share the cake.', z:'我们一起分享蛋糕吧。' },
  { w:'picture', cn:'图画', e:'🖼️', L:5, p:'ure', c:'p/i/c/t/ure', hc:[4], ps:'n.', d:'A drawing or photo.', x:'I colour the picture.', z:'我给图画上色。', b:['ket','pet'] },
  { w:'treasure', cn:'宝藏', e:'💎', L:5, p:'ure', c:'tr/ea/s/ure', hc:[3], ps:'n.', d:'Gold and pretty things that are hidden.', x:'The pirate finds the treasure.', z:'海盗找到了宝藏。', b:['ket','pet'] },
  { w:'nature', cn:'大自然', e:'🏔️', L:5, p:'ure', c:'n/a/t/ure', hc:[3], ps:'n.', d:'Trees, animals, rivers and the sky.', x:'We love nature.', z:'我们热爱大自然。', b:['ket','pet'] },
  { w:'future', cn:'未来', e:'🔮', L:5, p:'ure', c:'f/u/t/ure', hc:[3], ps:'n.', d:'The time that will come.', x:'I want to be a teacher in the future.', z:'我将来想当老师。', b:['ket','pet'] },

  /* ---------- Level 5 · 其他常用词（PET 拓展） ---------- */
  { w:'journey', cn:'旅程', e:'🧳', L:5, p:'our', c:'j/our/n/ey', hc:[1], ps:'n.', d:'A long trip from one place to another.', x:'Have a nice journey!', z:'祝你旅途愉快！', b:['ket','pet'] },
  { w:'country', cn:'国家', e:'🗾', L:5, p:'ou', c:'c/ou/n/try', hc:[1], ps:'n.', d:'A land with its own people and rules.', x:'China is a big country.', z:'中国是一个大国。', b:['ket','pet'] },
  { w:'important', cn:'重要的', e:'❗', L:5, p:'or', c:'im/p/or/t/ant', hc:[2], ps:'adj.', d:'Needing your care and attention.', x:'Sleep is important for you.', z:'睡眠对你很重要。', b:['ket','pet'] },
  { w:'remember', cn:'记得', e:'🔁', L:5, p:'er', c:'re/m/e/mb/er', hc:[4], ps:'v.', d:'To keep something in your head.', x:'Remember to wash your hands.', z:'记得要洗手。', b:['ket','pet'] },
  { w:'different', cn:'不同的', e:'🔀', L:5, p:'er', c:'d/i/ff/er/ent', hc:[3], ps:'adj.', d:'Not the same.', x:'We have different books.', z:'我们的书不一样。', b:['ket','pet'] },
  { w:'favourite', cn:'最喜欢的', e:'💖', L:5, p:'our', c:'f/a/v/our/ite', hc:[3], ps:'adj.', d:'The one you like best.', x:'Blue is my favourite colour.', z:'蓝色是我最喜欢的颜色。', b:['ket','pet'] },
  { w:'exercise', cn:'锻炼', e:'🏃', L:5, p:'i_e', c:'ex/er/c/i/se', hc:[3], ps:'n.', d:'Moving your body to stay strong.', x:'We do exercise every morning.', z:'我们每天早上锻炼。', b:['ket'] },
  { w:'surprise', cn:'惊喜', e:'🎊', L:5, p:'i_e', c:'s/ur/p/r/i/se', hc:[4], ps:'n.', d:'Something you did not expect.', x:'A surprise for you!', z:'给你一个惊喜！', b:['ket','pet'] },
  { w:'dangerous', cn:'危险的', e:'⚠️', L:5, p:'ous', c:'d/an/g/er/ous', hc:[4], ps:'adj.', d:'Not safe at all.', x:'It is dangerous to run here.', z:'在这里跑很危险。', b:['pet'] },

  /* ---------- Level 5 · y 读长元音 i ---------- */
  { w:'spy', cn:'侦探', e:'🕵️', L:5, p:'y', c:'sp/y', hc:[1], ps:'n.', d:'A person who finds out secrets.', x:'The spy has a hat.', z:'侦探有一顶帽子。' },
  { w:'shy', cn:'害羞的', e:'🙈', L:5, p:'y', c:'sh/y', hc:[1], ps:'adj.', d:'Not talking much with new people.', x:'The little cat is shy.', z:'小猫很害羞。' },
  { w:'butterfly', cn:'蝴蝶', e:'🦋', L:5, p:'er', c:'b/u/tt/er/fly', hc:[3], ps:'n.', d:'An insect with big pretty wings.', x:'A butterfly is on the flower.', z:'一只蝴蝶在花上。', b:['c2'] }
];
