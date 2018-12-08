(function () {

  enchant();

  window.onload = function () {
    var game = new Core(320, 320);
    var label = new Label();
    label.x = 16;
    label.y = 8;
    label.color = 'red';
    label.font = '14px "Arial"';
    label.text = '物理エンジンサンプル';

    game.rootScene.addChild(label);
    // 背景色の設定
    game.rootScene.backgroundColor = "#FFFFCC";

    // ゲーム素材読み込み
    game.preload({
      map2: './js/enchant.js/images/map2.png',
      icon0: './js/enchant.js/images/icon0.png'
    });

    /*
    * PhyBoxSprite(幅, 高さ, 動作モード, 密度, 摩擦力, 反発力, フラグ)
    */

    // ブロックの生成クラス
    var Wall = Class.create(PhyBoxSprite, {
      initialize: function (x, y) {
        PhyBoxSprite.call(this, 16, 16, enchant.box2d.DYNAMIC_SPRITE, 1.0, 0.5, 0.3, true);
        this.image = game.assets.map2;
        this.frame = 1;
        this.x = x;
        this.y = y;
        game.rootScene.addChild(this);
      }
    });

    // 床の生成クラス
    var Floor = Class.create(PhyBoxSprite, {
      initialize: function (x, y) {
        PhyBoxSprite.call(this, 16, 16, enchant.box2d.STATIC_SPRITE, 0, 1.0, 0, false);
        this.image = game.assets.map2;
        this.x = x;
        this.y = y;
        game.rootScene.addChild(this);
      }
    });

    // 豚キャラの生成クラス
    var Pig = Class.create(PhyCircleSprite, {
      initialize: function (x, y) {
        PhyCircleSprite.call(this, 8, enchant.box2d.DYNAMIC_SPRITE, 1.5, 10.0, 0.3, true);
        this.image = game.assets.icon0;
        this.frame = 22;
        this.x = x;
        this.y = y;
        game.rootScene.addChild(this);
      },
      ontouchend: function () {

        /*
         * applyImpulse(new b2Vec2(横方向の力, 縦方向の力))
         */

        this.applyImpulse(new b2Vec2(2.5, -1.0));
      }
    });
    var Panda = Class.create(PhyCircleSprite, {
      initialize: function (x, y) {
        PhyCircleSprite.call(this, 8, enchant.box2d.DYNAMIC_SPRITE, 1.5, 1.0, 0.3, true);
        this.image = game.assets.icon0;
        this.frame = 21;
        this.x = x;
        this.y = y;
        game.rootScene.addChild(this);
      },
      ontouchend: function () {
        /*
         * applyImpulse(new b2Vec2(横方向の力, 縦方向の力))
         */

        this.applyImpulse(new b2Vec2(2.5, -1.5));
      }
    });
    var KuroPig = Class.create(PhyCircleSprite, {
      initialize: function (x, y) {
        PhyCircleSprite.call(this, 8, enchant.box2d.DYNAMIC_SPRITE, 1.5, 1.0, 0.3, true);
        this.image = game.assets.icon0;
        this.frame = 23;
        this.x = x;
        this.y = y;
        game.rootScene.addChild(this);
      },
      ontouchend: function () {

        /*
         * applyImpulse(new b2Vec2(横方向の力, 縦方向の力))
         */

        this.applyImpulse(new b2Vec2(2.5, -1.0));
      }
    });

    // メインループ
    game.onload = function () {
      var world = new PhysicsWorld(0, 9.8);

      // 床の作成
      for (var i = 16; i < 320 - 16; i += 16) {
        var floor = new Floor(i, 304 - (16 * 2));
      }

      // 豚キャラの処理
      var pig = new Pig(70, 100);
      var panda = new Panda(40, 100);
      var kuroPig = new KuroPig(10, 100);

      // 壁の作成
      for (var i = 280 - (16 * 2); i > 220 - (16 * 2); i -= 20) {
        var wall = new Wall(200, i);
      }
      for (var i = 280 - (16 * 2); i > 180 - (16 * 2); i -= 20) {
        var wall = new Wall(250, i);
      }

      // game.rootScene.on(Event.TOUCH_START, function (e) {
      //   pig.x = e.x;
      // });
      // game.rootScene.on(Event.TOUCH_MOVE, function (e) {
      //   pig.x = e.x;
      // });

      game.rootScene.onenterframe = function () {
        // 物理エンジン処理
        world.step(game.fps);
      }
      var gameOverScene = new Scene();
      // gameOverScene.backgroundColor = 'black';

      pig.on('enterframe', function (r) {
        // 画面外判定
        if (r.localX < -320) {
          game.pushScene(gameOverScene);
          game.stop();
        }
      });

    }

    game.start();

  }
})();
