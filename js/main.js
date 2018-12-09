(function () {

  enchant();

  window.onload = function () {
    var game = new Core(320, 320);
    var title = new Label();
    title.x = 16;
    title.y = 8;
    title.color = 'red';
    title.font = '14px "Arial"';
    title.text = '積みゲーサンプル';

    var label = new Label();
    label.x = 16;
    label.y = 32;
    label.color = 'red';
    label.font = '14px "Arial"';
    label.text = 'スタート';

    var labelCount = new Label();
    labelCount.x = 16;
    labelCount.y = 56;
    labelCount.color = 'red';
    labelCount.font = '14px "Arial"';
    labelCount.text = '0';

    game.rootScene.addChild(title);
    game.rootScene.addChild(label);
    game.rootScene.addChild(labelCount);
    // 背景色の設定
    game.rootScene.backgroundColor = "#FFFFCC";

    // ゲーム素材読み込み
    game.preload({
      map1: './js/enchant.js/images/map1.png',
      map2: './js/enchant.js/images/map2.png',
      icon0: './js/enchant.js/images/icon0.png'
    });

    /*
    * PhyBoxSprite(幅, 高さ, 動作モード, 密度, 摩擦力, 反発力, フラグ)
    */

    // ブロックの生成クラス
    var Wall = Class.create(PhyBoxSprite, {
      initialize: function (x, y) {
        PhyBoxSprite.call(this, 32, 32, enchant.box2d.DYNAMIC_SPRITE, 10.0, 5.0, 0.0, true);
        this.image = game.assets.map1;
        this.frame = 2;
        this.x = x;
        this.y = y;
        game.rootScene.addChild(this);

        // 個数カウントアップ
        labelCount.text = Number(labelCount.text) + 1;

        this.on('enterframe', function (r) {
          // 画面外判定
          if (r.localY < -320) {
            // game.pushScene(gameOverScene);
            if (10 < Number(labelCount.text)) {
              label.text = 'おめでとう！';
            } else {
              label.text = 'ゲームオーバー';
            }
            game.stop();
          }
        });
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

    // メインループ
    game.onload = function () {
      var world = new PhysicsWorld(0, 3);

      // 床の作成
      for (var i = (16 * 1); i < 320 - (16 * 1); i += 16) {
        var floor = new Floor(i, 304 - (16 * 2));
      }

      // タッチするとボックスを作成
      game.rootScene.on(Event.TOUCH_START, function (e) {
        var wall = new Wall(e.x, e.y);
      });
      // game.rootScene.on(Event.TOUCH_MOVE, function (e) {
      //   pig.x = e.x;
      // });

      game.rootScene.onenterframe = function () {
        // 物理エンジン処理
        world.step(game.fps);
      }
      var gameOverScene = new Scene();
      // gameOverScene.backgroundColor = 'black';
    }

    game.start();

  }
})();
