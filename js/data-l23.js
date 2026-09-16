/* ===========================================================
   宝贝背单词小助手 · 词库（一）
   牛津自然拼读世界 2 级（短元音）+ 3 级（长元音）

   字段说明：
   w  = word 单词
   cn = 中文释义
   e  = emoji 图示（作“图片”用）
   L  = 牛津自拼级别（2 / 3 / 4 / 5）
   p  = 自拼规律（如 a_e / ai / ay / ee / igh / o_e ...）
   c  = 字母块切分（用 / 分隔，拼读教学用）
   hc = 需要高亮的字母块下标（对应 c 的序号，从 0 开始）
   ps = 词性
   d  = 英英释义（尽量用孩子能懂的简单英语）
   x  = 英文例句
   z  = 例句中文
   b  = 额外词库归属（c1/c2/c3 = 剑桥一级/二级/三级，ket/pet）
   =========================================================== */

const W23 = [
  /* ---------- Level 2 · 短元音 a ---------- */
  { w:'cat', cn:'猫咪', e:'🐱', L:2, p:'a', c:'c/a/t', hc:[1], ps:'n.', d:'A small animal with soft fur that says meow.', x:'The cat is sleeping on my bed.', z:'小猫在我床上睡觉。' },
  { w:'hat', cn:'帽子', e:'👒', L:2, p:'a', c:'h/a/t', hc:[1], ps:'n.', d:'Something you wear on your head.', x:'I wear a hat in the sun.', z:'太阳下我戴着帽子。' },
  { w:'bat', cn:'蝙蝠', e:'🦇', L:2, p:'a', c:'b/a/t', hc:[1], ps:'n.', d:'A small animal with wings that flies at night.', x:'A bat flies at night.', z:'蝙蝠在夜里飞。' },
  { w:'rat', cn:'老鼠', e:'🐀', L:2, p:'a', c:'r/a/t', hc:[1], ps:'n.', d:'A small grey animal with a long tail.', x:'The rat is under the box.', z:'老鼠在箱子下面。' },
  { w:'map', cn:'地图', e:'🗺️', L:2, p:'a', c:'m/a/p', hc:[1], ps:'n.', d:'A drawing of a place that helps you find your way.', x:'Look at the map of the city.', z:'看看这个城市的地图。' },
  { w:'cap', cn:'鸭舌帽', e:'🧢', L:2, p:'a', c:'c/a/p', hc:[1], ps:'n.', d:'A soft hat with a hard front part.', x:'My cap is blue and white.', z:'我的帽子是蓝白色的。' },
  { w:'bag', cn:'书包', e:'🎒', L:2, p:'a', c:'b/a/g', hc:[1], ps:'n.', d:'Something you use to carry things.', x:'My bag is full of books.', z:'我的书包里装满了书。' },
  { w:'fan', cn:'扇子', e:'🪭', L:2, p:'a', c:'f/a/n', hc:[1], ps:'n.', d:'A thing that moves air to make you cool.', x:'The fan makes me cool.', z:'扇子让我很凉快。' },
  { w:'van', cn:'货车', e:'🚐', L:2, p:'a', c:'v/a/n', hc:[1], ps:'n.', d:'A big car that carries things.', x:'The van is full of boxes.', z:'货车里装满了箱子。' },
  { w:'jam', cn:'果酱', e:'🍯', L:2, p:'a', c:'j/a/m', hc:[1], ps:'n.', d:'A sweet food made from fruit and sugar.', x:'I like jam on my bread.', z:'我喜欢在面包上抹果酱。' },
  { w:'ham', cn:'火腿', e:'🍖', L:2, p:'a', c:'h/a/m', hc:[1], ps:'n.', d:'Meat from a pig.', x:'I put ham in my sandwich.', z:'我在三明治里夹火腿。' },
  { w:'dad', cn:'爸爸', e:'👨', L:2, p:'a', c:'d/a/d', hc:[1], ps:'n.', d:'Your father.', x:'My dad reads a book to me.', z:'爸爸给我读故事。' },
  { w:'sad', cn:'伤心的', e:'😢', L:2, p:'a', c:'s/a/d', hc:[1], ps:'adj.', d:'Not happy.', x:'Do not be sad, let us play!', z:'别难过，我们一起玩！' },

  /* ---------- Level 2 · 短元音 e ---------- */
  { w:'bed', cn:'床', e:'🛏️', L:2, p:'e', c:'b/e/d', hc:[1], ps:'n.', d:'The thing you sleep on.', x:'I go to bed at nine.', z:'我九点上床睡觉。' },
  { w:'red', cn:'红色的', e:'🔴', L:2, p:'e', c:'r/e/d', hc:[1], ps:'adj.', d:'The colour of a tomato.', x:'My ball is red.', z:'我的球是红色的。' },
  { w:'hen', cn:'母鸡', e:'🐔', L:2, p:'e', c:'h/e/n', hc:[1], ps:'n.', d:'A female chicken.', x:'The hen has ten eggs.', z:'母鸡有十个蛋。' },
  { w:'pen', cn:'钢笔', e:'🖊️', L:2, p:'e', c:'p/e/n', hc:[1], ps:'n.', d:'A thing you write with.', x:'I write with a red pen.', z:'我用红笔写字。' },
  { w:'ten', cn:'十', e:'🔟', L:2, p:'e', c:'t/e/n', hc:[1], ps:'num.', d:'The number 10.', x:'I have ten fingers.', z:'我有十根手指。' },
  { w:'jet', cn:'喷气机', e:'✈️', L:2, p:'e', c:'j/e/t', hc:[1], ps:'n.', d:'A very fast plane.', x:'The jet flies very high.', z:'喷气机飞得很高。' },
  { w:'net', cn:'网', e:'🥅', L:2, p:'e', c:'n/e/t', hc:[1], ps:'n.', d:'Something with holes in it for catching things.', x:'He catches fish with a net.', z:'他用网捕鱼。' },
  { w:'pet', cn:'宠物', e:'🐶', L:2, p:'e', c:'p/e/t', hc:[1], ps:'n.', d:'An animal that lives with you at home.', x:'My pet can run and jump.', z:'我的宠物会跑会跳。' },
  { w:'wet', cn:'湿的', e:'💧', L:2, p:'e', c:'w/e/t', hc:[1], ps:'adj.', d:'Covered with water.', x:'My shoes are wet.', z:'我的鞋子湿了。' },
  { w:'leg', cn:'腿', e:'🦵', L:2, p:'e', c:'l/e/g', hc:[1], ps:'n.', d:'A part of your body that you stand on.', x:'A dog has four legs.', z:'狗有四条腿。' },
  { w:'egg', cn:'鸡蛋', e:'🥚', L:2, p:'e', c:'e/gg', hc:[0], ps:'n.', d:'A round thing that a bird lays.', x:'The hen lays an egg.', z:'母鸡下了一个蛋。' },

  /* ---------- Level 2 · 短元音 i ---------- */
  { w:'pig', cn:'小猪', e:'🐷', L:2, p:'i', c:'p/i/g', hc:[1], ps:'n.', d:'A fat pink farm animal.', x:'The pig is in the mud.', z:'小猪在泥巴里。' },
  { w:'big', cn:'大的', e:'🐘', L:2, p:'i', c:'b/i/g', hc:[1], ps:'adj.', d:'Very large in size.', x:'The elephant is big.', z:'大象很大。' },
  { w:'six', cn:'六', e:'6️⃣', L:2, p:'i', c:'s/i/x', hc:[1], ps:'num.', d:'The number 6.', x:'I have six apples.', z:'我有六个苹果。' },
  { w:'lip', cn:'嘴唇', e:'👄', L:2, p:'i', c:'l/i/p', hc:[1], ps:'n.', d:'One of the two soft parts around your mouth.', x:'My lip hurts a little.', z:'我的嘴唇有点疼。' },
  { w:'zip', cn:'拉链', e:'🤐', L:2, p:'i', c:'z/i/p', hc:[1], ps:'n.', d:'A thing that closes your clothes or bag.', x:'Zip up your jacket.', z:'把外套拉链拉上。' },
  { w:'pin', cn:'图钉', e:'📌', L:2, p:'i', c:'p/i/n', hc:[1], ps:'n.', d:'A small sharp thing for paper.', x:'I put a pin on the map.', z:'我把图钉钉在地图上。' },
  { w:'win', cn:'赢', e:'🏆', L:2, p:'i', c:'w/i/n', hc:[1], ps:'v.', d:'To be the best in a game.', x:'I want to win the game.', z:'我想赢得比赛。' },
  { w:'hit', cn:'击打', e:'🏏', L:2, p:'i', c:'h/i/t', hc:[1], ps:'v.', d:'To touch something very hard.', x:'He hit the ball with a bat.', z:'他用球棒击球。' },

  /* ---------- Level 2 · 短元音 o ---------- */
  { w:'dog', cn:'小狗', e:'🐕', L:2, p:'o', c:'d/o/g', hc:[1], ps:'n.', d:'An animal that says woof.', x:'The dog runs very fast.', z:'小狗跑得很快。' },
  { w:'box', cn:'箱子', e:'📦', L:2, p:'o', c:'b/o/x', hc:[1], ps:'n.', d:'A thing you put things in.', x:'The box is full of toys.', z:'箱子里装满了玩具。' },
  { w:'fox', cn:'狐狸', e:'🦊', L:2, p:'o', c:'f/o/x', hc:[1], ps:'n.', d:'A wild animal with a long tail.', x:'A fox lives in the forest.', z:'狐狸住在森林里。' },
  { w:'hot', cn:'热的', e:'🔥', L:2, p:'o', c:'h/o/t', hc:[1], ps:'adj.', d:'Very warm.', x:'The soup is hot.', z:'汤很烫。' },
  { w:'pot', cn:'锅', e:'🍲', L:2, p:'o', c:'p/o/t', hc:[1], ps:'n.', d:'A deep round thing you cook in.', x:'The pot is on the fire.', z:'锅放在火上。' },
  { w:'mop', cn:'拖把', e:'🧹', L:2, p:'o', c:'m/o/p', hc:[1], ps:'n.', d:'A tool for cleaning the floor.', x:'I clean the floor with a mop.', z:'我用拖把拖地。' },
  { w:'top', cn:'顶部', e:'🔝', L:2, p:'o', c:'t/o/p', hc:[1], ps:'n.', d:'The highest part of something.', x:'We are at the top of the hill.', z:'我们在小山顶上。' },
  { w:'log', cn:'木头', e:'🪵', L:2, p:'o', c:'l/o/g', hc:[1], ps:'n.', d:'A thick piece of wood from a tree.', x:'Let us sit on the log.', z:'我们坐在木头上吧。' },

  /* ---------- Level 2 · 短元音 u ---------- */
  { w:'sun', cn:'太阳', e:'☀️', L:2, p:'u', c:'s/u/n', hc:[1], ps:'n.', d:'The big star that gives us light.', x:'The sun is very bright.', z:'太阳很亮。' },
  { w:'cup', cn:'杯子', e:'☕', L:2, p:'u', c:'c/u/p', hc:[1], ps:'n.', d:'A small thing you drink from.', x:'A cup of milk, please.', z:'请给我一杯牛奶。' },
  { w:'bus', cn:'公交车', e:'🚌', L:2, p:'u', c:'b/u/s', hc:[1], ps:'n.', d:'A big car that carries many people.', x:'I take the bus to school.', z:'我坐公交车上学。' },
  { w:'bug', cn:'小虫子', e:'🐞', L:2, p:'u', c:'b/u/g', hc:[1], ps:'n.', d:'A very small animal with six legs.', x:'The bug is on the leaf.', z:'小虫子在叶子上。' },
  { w:'nut', cn:'坚果', e:'🥜', L:2, p:'u', c:'n/u/t', hc:[1], ps:'n.', d:'A small hard fruit with a shell.', x:'Squirrels like to eat nuts.', z:'松鼠喜欢吃坚果。' },
  { w:'cut', cn:'剪开', e:'✂️', L:2, p:'u', c:'c/u/t', hc:[1], ps:'v.', d:'To use scissors on something.', x:'Cut the paper here.', z:'在这里把纸剪开。' },
  { w:'mug', cn:'大杯子', e:'🍵', L:2, p:'u', c:'m/u/g', hc:[1], ps:'n.', d:'A big cup with a handle.', x:'I drink warm milk from a mug.', z:'我用大杯子喝温牛奶。' },
  { w:'rug', cn:'地毯', e:'🧶', L:2, p:'u', c:'r/u/g', hc:[1], ps:'n.', d:'A soft cover for the floor.', x:'The cat sits on the rug.', z:'小猫坐在地毯上。' },
  { w:'hug', cn:'拥抱', e:'🤗', L:2, p:'u', c:'h/u/g', hc:[1], ps:'v.', d:'To hold someone with your arms.', x:'Give me a big hug!', z:'给我一个大大的拥抱！' },

  /* ---------- Level 3 · a_e ---------- */
  { w:'cake', cn:'蛋糕', e:'🎂', L:3, p:'a_e', c:'c/a/k/e', hc:[1,3], ps:'n.', d:'A sweet food made with flour, eggs and sugar.', x:'I want a cake for my birthday.', z:'我生日想要一个蛋糕。' },
  { w:'bake', cn:'烤', e:'🥖', L:3, p:'a_e', c:'b/a/k/e', hc:[1,3], ps:'v.', d:'To cook food in an oven.', x:'My mum can bake bread.', z:'我妈妈会烤面包。' },
  { w:'game', cn:'游戏', e:'🎮', L:3, p:'a_e', c:'g/a/m/e', hc:[1,3], ps:'n.', d:'Something you play and have fun with.', x:'Let us play a fun game!', z:'我们玩一个好玩的游戏吧！' },
  { w:'name', cn:'名字', e:'🏷️', L:3, p:'a_e', c:'n/a/m/e', hc:[1,3], ps:'n.', d:'The word that we call you by.', x:'Can you write your name?', z:'你会写自己的名字吗？' },
  { w:'lake', cn:'湖', e:'🌊', L:3, p:'a_e', c:'l/a/k/e', hc:[1,3], ps:'n.', d:'A big area of water with land around it.', x:'The lake is very blue.', z:'湖水很蓝。' },
  { w:'snake', cn:'蛇', e:'🐍', L:3, p:'a_e', c:'s/n/a/k/e', hc:[2,4], ps:'n.', d:'A long animal with no legs.', x:'The snake is long and green.', z:'这条蛇又长又绿。' },
  { w:'plane', cn:'飞机', e:'✈️', L:3, p:'a_e', c:'p/l/a/n/e', hc:[2,4], ps:'n.', d:'A machine that flies in the sky.', x:'The plane goes up in the sky.', z:'飞机飞上了天。' },
  { w:'whale', cn:'鲸鱼', e:'🐋', L:3, p:'a_e', c:'w/h/a/l/e', hc:[2,4], ps:'n.', d:'A very big animal that lives in the sea.', x:'A whale is bigger than a boat.', z:'鲸鱼比船还大。' },
  { w:'grape', cn:'葡萄', e:'🍇', L:3, p:'a_e', c:'g/r/a/p/e', hc:[2,4], ps:'n.', d:'A small round fruit that grows in bunches.', x:'I like to eat grapes.', z:'我喜欢吃葡萄。' },
  { w:'cape', cn:'披风', e:'🦸', L:3, p:'a_e', c:'c/a/p/e', hc:[1,3], ps:'n.', d:'A piece of cloth you wear on your back.', x:'The hero has a red cape.', z:'这位英雄有一条红披风。' },
  { w:'face', cn:'脸', e:'😀', L:3, p:'a_e', c:'f/a/c/e', hc:[1,3], ps:'n.', d:'The front part of your head.', x:'Wash your face in the morning.', z:'早上要洗脸。' },
  { w:'cage', cn:'笼子', e:'🐦', L:3, p:'a_e', c:'c/a/g/e', hc:[1,3], ps:'n.', d:'A box with bars for keeping an animal in.', x:'The bird is in the cage.', z:'小鸟在笼子里。' },

  /* ---------- Level 3 · ai ---------- */
  { w:'rain', cn:'雨', e:'🌧️', L:3, p:'ai', c:'r/ai/n', hc:[1], ps:'n.', d:'Water that falls from the sky.', x:'The rain is cold today.', z:'今天的雨很冷。' },
  { w:'train', cn:'火车', e:'🚂', L:3, p:'ai', c:'t/r/ai/n', hc:[2], ps:'n.', d:'A long thing on wheels that runs on tracks.', x:'The train goes very fast.', z:'火车跑得很快。' },
  { w:'tail', cn:'尾巴', e:'🐱', L:3, p:'ai', c:'t/ai/l', hc:[1], ps:'n.', d:'The part that hangs at the back of an animal.', x:'The cat has a long tail.', z:'小猫有一条长尾巴。' },
  { w:'snail', cn:'蜗牛', e:'🐌', L:3, p:'ai', c:'s/n/ai/l', hc:[2], ps:'n.', d:'A small animal that walks very slowly.', x:'The snail is very slow.', z:'蜗牛走得很慢。' },
  { w:'paint', cn:'画画', e:'🎨', L:3, p:'ai', c:'p/ai/n/t', hc:[1], ps:'v.', d:'To make a picture with colours.', x:'I paint a big rainbow.', z:'我画了一道大彩虹。' },
  { w:'mail', cn:'邮件', e:'✉️', L:3, p:'ai', c:'m/ai/l', hc:[1], ps:'n.', d:'Letters that you send to someone.', x:'I have mail from my friend.', z:'我收到了朋友的邮件。' },

  /* ---------- Level 3 · ay ---------- */
  { w:'day', cn:'白天', e:'🌞', L:3, p:'ay', c:'d/ay', hc:[1], ps:'n.', d:'The time when the sun is up.', x:'We play all day long.', z:'我们玩了一整天。' },
  { w:'play', cn:'玩', e:'🎪', L:3, p:'ay', c:'p/l/ay', hc:[2], ps:'v.', d:'To have fun and do things you like.', x:'Let us play in the park.', z:'我们去公园玩吧。' },
  { w:'bay', cn:'海湾', e:'🏖️', L:3, p:'ay', c:'b/ay', hc:[1], ps:'n.', d:'A part of the sea that is beside the land.', x:'Our boat is in the bay.', z:'我们的船停在海湾里。' },
  { w:'hay', cn:'干草', e:'🌾', L:3, p:'ay', c:'h/ay', hc:[1], ps:'n.', d:'Dry grass that farm animals eat.', x:'The horse eats hay.', z:'马在吃干草。' },
  { w:'tray', cn:'托盘', e:'🍽️', L:3, p:'ay', c:'t/r/ay', hc:[2], ps:'n.', d:'A flat thing you carry food on.', x:'Put the cups on the tray.', z:'把杯子放在托盘上。' },
  { w:'gray', cn:'灰色的', e:'🩶', L:3, p:'ay', c:'g/r/ay', hc:[2], ps:'adj.', d:'The colour of clouds on a rainy day.', x:'The sky is gray today.', z:'今天的天空灰灰的。' },

  /* ---------- Level 3 · ee ---------- */
  { w:'bee', cn:'蜜蜂', e:'🐝', L:3, p:'ee', c:'b/ee', hc:[1], ps:'n.', d:'A small insect that makes honey.', x:'A bee is on the flower.', z:'一朵花上有一只蜜蜂。' },
  { w:'tree', cn:'大树', e:'🌳', L:3, p:'ee', c:'t/r/ee', hc:[2], ps:'n.', d:'A tall plant with a trunk and leaves.', x:'I can climb the tree.', z:'我会爬树。' },
  { w:'feet', cn:'脚', e:'🦶', L:3, p:'ee', c:'f/ee/t', hc:[1], ps:'n.', d:'The two parts you stand on.', x:'My feet are cold.', z:'我的脚很冷。' },
  { w:'green', cn:'绿色的', e:'🟢', L:3, p:'ee', c:'g/r/ee/n', hc:[2], ps:'adj.', d:'The colour of grass and leaves.', x:'The grass is green.', z:'小草是绿色的。' },
  { w:'sheep', cn:'小羊', e:'🐑', L:3, p:'ee', c:'sh/ee/p', hc:[1], ps:'n.', d:'A farm animal with soft wool.', x:'The sheep is eating grass.', z:'小羊在吃草。' },
  { w:'seed', cn:'种子', e:'🌱', L:3, p:'ee', c:'s/ee/d', hc:[1], ps:'n.', d:'A small thing that grows into a plant.', x:'I put a seed in the soil.', z:'我把一颗种子放进土里。' },
  { w:'jeep', cn:'吉普车', e:'🚙', L:3, p:'ee', c:'j/ee/p', hc:[1], ps:'n.', d:'A strong car for bumpy roads.', x:'The jeep goes up the hill.', z:'吉普车开上山坡。' },
  { w:'queen', cn:'女王', e:'👑', L:3, p:'ee', c:'qu/ee/n', hc:[1], ps:'n.', d:'A woman who rules a country.', x:'The queen has a gold crown.', z:'女王有一顶金王冠。' },
  { w:'wheel', cn:'轮子', e:'🛞', L:3, p:'ee', c:'wh/ee/l', hc:[1], ps:'n.', d:'A round part that turns and makes things move.', x:'The car has four wheels.', z:'汽车有四个轮子。' },
  { w:'cheese', cn:'奶酪', e:'🧀', L:3, p:'ee', c:'ch/ee/s/e', hc:[1], ps:'n.', d:'A food made from milk.', x:'A mouse likes cheese.', z:'老鼠喜欢奶酪。' },
  { w:'knee', cn:'膝盖', e:'🦿', L:3, p:'ee', c:'k/n/ee', hc:[2], ps:'n.', d:'The middle part of your leg.', x:'I hurt my knee.', z:'我的膝盖受伤了。' },
  { w:'three', cn:'三', e:'3️⃣', L:3, p:'ee', c:'th/r/ee', hc:[2], ps:'num.', d:'The number 3.', x:'I have three little cats.', z:'我有三只小猫。' },

  /* ---------- Level 3 · ea ---------- */
  { w:'sea', cn:'大海', e:'🌊', L:3, p:'ea', c:'s/ea', hc:[1], ps:'n.', d:'A very big area of salt water.', x:'We swim in the sea.', z:'我们在海里游泳。' },
  { w:'tea', cn:'茶', e:'🍵', L:3, p:'ea', c:'t/ea', hc:[1], ps:'n.', d:'A hot drink made from leaves.', x:'My grandpa drinks tea.', z:'我爷爷喝茶。' },
  { w:'meat', cn:'肉', e:'🥩', L:3, p:'ea', c:'m/ea/t', hc:[1], ps:'n.', d:'Food that comes from animals.', x:'I eat meat and rice.', z:'我吃肉和米饭。' },
  { w:'leaf', cn:'叶子', e:'🍃', L:3, p:'ea', c:'l/ea/f', hc:[1], ps:'n.', d:'A flat green part of a plant.', x:'A leaf falls on my head.', z:'一片叶子落在我头上。' },
  { w:'peach', cn:'桃子', e:'🍑', L:3, p:'ea', c:'p/ea/ch', hc:[1], ps:'n.', d:'A soft round fruit with a big seed.', x:'This peach is very sweet.', z:'这个桃子很甜。' },
  { w:'beach', cn:'沙滩', e:'🏝️', L:3, p:'ea', c:'b/ea/ch', hc:[1], ps:'n.', d:'Land with sand next to the sea.', x:'We play on the beach.', z:'我们在沙滩上玩。' },
  { w:'cream', cn:'奶油', e:'🍦', L:3, p:'ea', c:'c/r/ea/m', hc:[2], ps:'n.', d:'A soft sweet food made from milk.', x:'I want ice cream!', z:'我想要冰淇淋！' },
  { w:'dream', cn:'梦', e:'💭', L:3, p:'ea', c:'d/r/ea/m', hc:[2], ps:'n.', d:'Pictures in your head when you sleep.', x:'I had a happy dream.', z:'我做了一个开心的梦。' },
  { w:'eagle', cn:'老鹰', e:'🦅', L:3, p:'ea', c:'ea/gle', hc:[0], ps:'n.', d:'A big bird that flies very high.', x:'An eagle can see far away.', z:'老鹰能看得很远。' },
  { w:'eat', cn:'吃', e:'🍽️', L:3, p:'ea', c:'ea/t', hc:[0], ps:'v.', d:'To put food in your mouth.', x:'Let us eat lunch now.', z:'我们现在吃午饭吧。' },
  { w:'read', cn:'读', e:'📖', L:3, p:'ea', c:'r/ea/d', hc:[1], ps:'v.', d:'To look at words and know what they say.', x:'I read a book every night.', z:'我每天晚上读书。' },

  /* ---------- Level 3 · y 作长元音 e ---------- */
  { w:'happy', cn:'开心的', e:'😊', L:3, p:'y', c:'h/a/pp/y', hc:[3], ps:'adj.', d:'Feeling good and smiling.', x:'I am happy today.', z:'我今天很开心。' },
  { w:'baby', cn:'宝宝', e:'👶', L:3, p:'y', c:'b/a/b/y', hc:[3], ps:'n.', d:'A very young child.', x:'The baby is sleeping.', z:'宝宝在睡觉。' },
  { w:'candy', cn:'糖果', e:'🍬', L:3, p:'y', c:'c/a/n/d/y', hc:[4], ps:'n.', d:'A small sweet thing you eat.', x:'One candy for you.', z:'给你一颗糖。' },
  { w:'puppy', cn:'小狗', e:'🐶', L:3, p:'y', c:'p/u/pp/y', hc:[3], ps:'n.', d:'A baby dog.', x:'The puppy can run!', z:'小狗会跑啦！' },
  { w:'pony', cn:'小马', e:'🦄', L:3, p:'y', c:'p/o/n/y', hc:[3], ps:'n.', d:'A small horse.', x:'I like to ride a pony.', z:'我喜欢骑小马。' },
  { w:'sunny', cn:'晴朗的', e:'🌤️', L:3, p:'y', c:'s/u/nn/y', hc:[3], ps:'adj.', d:'With a lot of sun.', x:'It is a sunny day.', z:'今天是个晴天。' },
  { w:'windy', cn:'有风的', e:'🌬️', L:3, p:'y', c:'w/i/n/d/y', hc:[4], ps:'adj.', d:'With a lot of wind.', x:'It is windy outside.', z:'外面在刮风。' },
  { w:'rainy', cn:'下雨的', e:'☔', L:3, p:'y', c:'r/ai/n/y', hc:[3], ps:'adj.', d:'With a lot of rain.', x:'Do not go out on a rainy day.', z:'下雨天不要出去。' },
  { w:'story', cn:'故事', e:'📕', L:3, p:'y', c:'st/or/y', hc:[2], ps:'n.', d:'Words that tell about things that happen.', x:'Tell me a story, mum.', z:'妈妈，给我讲个故事吧。' },

  /* ---------- Level 3 · i_e ---------- */
  { w:'bike', cn:'自行车', e:'🚲', L:3, p:'i_e', c:'b/i/k/e', hc:[1,3], ps:'n.', d:'Something with two wheels that you ride.', x:'I ride my bike to the park.', z:'我骑自行车去公园。' },
  { w:'kite', cn:'风筝', e:'🪁', L:3, p:'i_e', c:'k/i/t/e', hc:[1,3], ps:'n.', d:'A toy that flies in the wind on a string.', x:'My kite is in the sky.', z:'我的风筝在天上。' },
  { w:'nine', cn:'九', e:'9️⃣', L:3, p:'i_e', c:'n/i/n/e', hc:[1,3], ps:'num.', d:'The number 9.', x:'I have nine books.', z:'我有九本书。' },
  { w:'five', cn:'五', e:'5️⃣', L:3, p:'i_e', c:'f/i/v/e', hc:[1,3], ps:'num.', d:'The number 5.', x:'A star has five points.', z:'星星有五个角。' },
  { w:'rice', cn:'米饭', e:'🍚', L:3, p:'i_e', c:'r/i/c/e', hc:[1,3], ps:'n.', d:'Small white grains that we cook and eat.', x:'I eat rice every day.', z:'我每天都吃米饭。' },
  { w:'time', cn:'时间', e:'⏰', L:3, p:'i_e', c:'t/i/m/e', hc:[1,3], ps:'n.', d:'What we look at on a clock.', x:'It is time to sleep.', z:'该睡觉啦。' },
  { w:'slide', cn:'滑梯', e:'🛝', L:3, p:'i_e', c:'s/l/i/d/e', hc:[2,4], ps:'n.', d:'A high thing you sit on to go down.', x:'I go down the slide.', z:'我从滑梯上滑下来。' },
  { w:'white', cn:'白色的', e:'⚪', L:3, p:'i_e', c:'wh/i/t/e', hc:[1,3], ps:'adj.', d:'The colour of milk and snow.', x:'My shoes are white.', z:'我的鞋子是白色的。' },
  { w:'smile', cn:'微笑', e:'😄', L:3, p:'i_e', c:'s/m/i/l/e', hc:[2,4], ps:'v.', d:'To look happy with your mouth.', x:'Smile for the photo!', z:'拍照时笑一笑！' },
  { w:'ride', cn:'骑', e:'🎠', L:3, p:'i_e', c:'r/i/d/e', hc:[1,3], ps:'v.', d:'To sit on something and make it go.', x:'I can ride a horse.', z:'我会骑马。' },
  { w:'ice', cn:'冰', e:'🧊', L:3, p:'i_e', c:'i/c/e', hc:[0,2], ps:'n.', d:'Water that is very cold and hard.', x:'The ice is cold.', z:'冰很冷。' },
  { w:'line', cn:'线', e:'📏', L:3, p:'i_e', c:'l/i/n/e', hc:[1,3], ps:'n.', d:'A long thin mark.', x:'Draw a line here.', z:'在这里画一条线。' },

  /* ---------- Level 3 · igh ---------- */
  { w:'night', cn:'夜晚', e:'🌙', L:3, p:'igh', c:'n/igh/t', hc:[1], ps:'n.', d:'The dark time when we sleep.', x:'Stars come out at night.', z:'晚上星星出来了。' },
  { w:'light', cn:'灯', e:'💡', L:3, p:'igh', c:'l/igh/t', hc:[1], ps:'n.', d:'Something that makes things bright.', x:'Turn on the light, please.', z:'请把灯打开。' },
  { w:'high', cn:'高的', e:'⬆️', L:3, p:'igh', c:'h/igh', hc:[1], ps:'adj.', d:'A long way up.', x:'The bird flies high.', z:'小鸟飞得很高。' },
  { w:'right', cn:'右边的', e:'➡️', L:3, p:'igh', c:'r/igh/t', hc:[1], ps:'adj.', d:'The side that is not left.', x:'Turn right at the shop.', z:'在商店那里向右转。' },
  { w:'bright', cn:'明亮的', e:'✨', L:3, p:'igh', c:'b/r/igh/t', hc:[2], ps:'adj.', d:'Full of light.', x:'The moon is bright tonight.', z:'今晚月亮很亮。' },

  /* ---------- Level 3 · ie ---------- */
  { w:'pie', cn:'馅饼', e:'🥧', L:3, p:'ie', c:'p/ie', hc:[1], ps:'n.', d:'Food with pastry and something sweet inside.', x:'We eat apple pie.', z:'我们吃苹果馅饼。' },
  { w:'tie', cn:'领带', e:'👔', L:3, p:'ie', c:'t/ie', hc:[1], ps:'n.', d:'A long thin cloth men wear around the neck.', x:'My dad wears a blue tie.', z:'爸爸系着蓝色领带。' },
  { w:'fries', cn:'薯条', e:'🍟', L:3, p:'ie', c:'f/r/ie/s', hc:[2], ps:'n.', d:'Long pieces of potato cooked in oil.', x:'I love hot fries.', z:'我很喜欢热薯条。' },

  /* ---------- Level 3 · o_e ---------- */
  { w:'nose', cn:'鼻子', e:'👃', L:3, p:'o_e', c:'n/o/s/e', hc:[1,3], ps:'n.', d:'The part of your face you smell with.', x:'A rabbit has a small nose.', z:'兔子有一个小鼻子。' },
  { w:'rose', cn:'玫瑰', e:'🌹', L:3, p:'o_e', c:'r/o/s/e', hc:[1,3], ps:'n.', d:'A pretty flower with a nice smell.', x:'This rose is for you.', z:'这朵玫瑰送给你。' },
  { w:'home', cn:'家', e:'🏠', L:3, p:'o_e', c:'h/o/m/e', hc:[1,3], ps:'n.', d:'The place where you live.', x:'I am at home now.', z:'我现在在家里。' },
  { w:'bone', cn:'骨头', e:'🦴', L:3, p:'o_e', c:'b/o/n/e', hc:[1,3], ps:'n.', d:'A hard white part inside your body.', x:'The dog has a big bone.', z:'小狗有一根大骨头。' },
  { w:'rope', cn:'绳子', e:'🪢', L:3, p:'o_e', c:'r/o/p/e', hc:[1,3], ps:'n.', d:'A very thick string.', x:'Pull the rope with me.', z:'跟我一起拉绳子。' },
  { w:'note', cn:'便条', e:'📝', L:3, p:'o_e', c:'n/o/t/e', hc:[1,3], ps:'n.', d:'A short letter.', x:'Mum left a note for me.', z:'妈妈给我留了一张便条。' },
  { w:'hole', cn:'洞', e:'🕳️', L:3, p:'o_e', c:'h/o/l/e', hc:[1,3], ps:'n.', d:'An open place in something.', x:'A mouse is in the hole.', z:'一只老鼠在洞里。' },
  { w:'stone', cn:'石头', e:'🪨', L:3, p:'o_e', c:'s/t/o/n/e', hc:[2,4], ps:'n.', d:'A small piece of rock.', x:'I found a round stone.', z:'我找到一块圆石头。' },
  { w:'phone', cn:'手机', e:'📱', L:3, p:'o_e', c:'ph/o/n/e', hc:[1,3], ps:'n.', d:'A thing you use to call people.', x:'Dad is on the phone.', z:'爸爸在打电话。' },

  /* ---------- Level 3 · oa ---------- */
  { w:'boat', cn:'小船', e:'⛵', L:3, p:'oa', c:'b/oa/t', hc:[1], ps:'n.', d:'Something that goes on water.', x:'The boat is on the lake.', z:'小船在湖上。' },
  { w:'coat', cn:'外套', e:'🧥', L:3, p:'oa', c:'c/oa/t', hc:[1], ps:'n.', d:'A warm thing you wear outside.', x:'Put on your coat, it is cold.', z:'天冷，把外套穿上。' },
  { w:'goat', cn:'山羊', e:'🐐', L:3, p:'oa', c:'g/oa/t', hc:[1], ps:'n.', d:'A farm animal with horns.', x:'The goat eats the grass.', z:'山羊在吃草。' },
  { w:'road', cn:'马路', e:'🛣️', L:3, p:'oa', c:'r/oa/d', hc:[1], ps:'n.', d:'A hard way for cars to go on.', x:'Look both ways on the road.', z:'过马路要两边看。' },
  { w:'soap', cn:'肥皂', e:'🧼', L:3, p:'oa', c:'s/oa/p', hc:[1], ps:'n.', d:'Something you wash with.', x:'Wash your hands with soap.', z:'用肥皂洗手。' },
  { w:'toast', cn:'吐司', e:'🍞', L:3, p:'oa', c:'t/oa/st', hc:[1], ps:'n.', d:'Bread that is cooked until it is brown.', x:'I eat toast for breakfast.', z:'我早餐吃吐司。' },

  /* ---------- Level 3 · ow 作长元音 o ---------- */
  { w:'snow', cn:'雪', e:'❄️', L:3, p:'ow', c:'s/n/ow', hc:[2], ps:'n.', d:'Soft white pieces of ice that fall from the sky.', x:'The snow is white and soft.', z:'雪又白又软。' },
  { w:'window', cn:'窗户', e:'🪟', L:3, p:'ow', c:'w/i/n/d/ow', hc:[4], ps:'n.', d:'Glass in a wall that lets in light.', x:'Look out of the window.', z:'看看窗外。' },
  { w:'yellow', cn:'黄色的', e:'🟡', L:3, p:'ow', c:'y/e/ll/ow', hc:[3], ps:'adj.', d:'The colour of the sun.', x:'The sun is yellow.', z:'太阳是黄色的。' },
  { w:'bowl', cn:'碗', e:'🥣', L:3, p:'ow', c:'b/ow/l', hc:[1], ps:'n.', d:'A round thing you eat from.', x:'A bowl of rice, please.', z:'请给我一碗米饭。' },
  { w:'grow', cn:'生长', e:'🌿', L:3, p:'ow', c:'g/r/ow', hc:[2], ps:'v.', d:'To get bigger.', x:'Plants grow in the sun.', z:'植物在阳光下生长。' },
  { w:'show', cn:'表演', e:'🎭', L:3, p:'ow', c:'sh/ow', hc:[1], ps:'n.', d:'A time when people watch and enjoy something.', x:'We watch a funny show.', z:'我们看了一场有趣的表演。' },
  { w:'pillow', cn:'枕头', e:'🛌', L:3, p:'ow', c:'p/i/ll/ow', hc:[3], ps:'n.', d:'A soft thing you put your head on.', x:'My pillow is very soft.', z:'我的枕头很软。' },
  { w:'rainbow', cn:'彩虹', e:'🌈', L:3, p:'ow', c:'r/ai/n/b/ow', hc:[4], ps:'n.', d:'Many colours in the sky after rain.', x:'Look, a rainbow!', z:'快看，彩虹！' },

  /* ---------- Level 3 · u_e / ue / ui / ew ---------- */
  { w:'cube', cn:'方块', e:'🎲', L:3, p:'u_e', c:'c/u/b/e', hc:[1,3], ps:'n.', d:'A shape with six square sides.', x:'I have a red cube.', z:'我有一个红色的方块。' },
  { w:'tube', cn:'管子', e:'🧪', L:3, p:'u_e', c:'t/u/b/e', hc:[1,3], ps:'n.', d:'A long round thing that is empty inside.', x:'The water goes down the tube.', z:'水流进管子里。' },
  { w:'blue', cn:'蓝色的', e:'🔵', L:3, p:'ue', c:'b/l/ue', hc:[2], ps:'adj.', d:'The colour of the sky.', x:'The sky is blue today.', z:'今天天空很蓝。' },
  { w:'glue', cn:'胶水', e:'🧴', L:3, p:'ue', c:'g/l/ue', hc:[2], ps:'n.', d:'Something you use to make things stick.', x:'Use glue to fix the box.', z:'用胶水把盒子粘好。' },
  { w:'true', cn:'真的', e:'✅', L:3, p:'ue', c:'t/r/ue', hc:[2], ps:'adj.', d:'Right, not a lie.', x:'This story is true.', z:'这个故事是真的。' },
  { w:'fruit', cn:'水果', e:'🍎', L:3, p:'ui', c:'f/r/ui/t', hc:[2], ps:'n.', d:'Sweet food that grows on plants.', x:'Fruit is good for you.', z:'水果对身体好。' },
  { w:'juice', cn:'果汁', e:'🧃', L:3, p:'ui', c:'j/ui/c/e', hc:[1], ps:'n.', d:'A drink made from fruit.', x:'I want orange juice.', z:'我想喝橙汁。' },
  { w:'new', cn:'新的', e:'🆕', L:3, p:'ew', c:'n/ew', hc:[1], ps:'adj.', d:'Not old.', x:'I have a new bag.', z:'我有一个新书包。' },
  { w:'news', cn:'新闻', e:'📰', L:3, p:'ew', c:'n/ew/s', hc:[1], ps:'n.', d:'Things that just happened.', x:'Dad is reading the news.', z:'爸爸在看新闻。' },
  { w:'chew', cn:'咀嚼', e:'😋', L:3, p:'ew', c:'ch/ew', hc:[1], ps:'v.', d:'To use your teeth on food.', x:'Chew your food well.', z:'要细嚼慢咽。' }
];
