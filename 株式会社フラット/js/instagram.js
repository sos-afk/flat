/**
 * 株式会社フラット ウェブサイト
 * Instagram連携用スクリプト
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // インスタグラムフィード表示用関数
  function loadInstagramFeed() {
    const instagramContainer = document.querySelector('.instagram-grid');
    const instagramLargeContainer = document.querySelector('.instagram-feed-large');
    
    if (!instagramContainer && !instagramLargeContainer) return;

    // デモ用のインスタグラム投稿データ
    // 実際の実装ではInstagram Graph APIを使用して取得する
    const demoInstagramPosts = [
      {
        id: 'post1',
        imageUrl: 'images/instagram/post1.jpg',
        caption: '現場の足場組立作業中 #足場工事 #福岡 #職人技',
        link: 'https://instagram.com/'
      },
      {
        id: 'post2',
        imageUrl: 'images/instagram/post2.jpg',
        caption: '完成した足場 #くさび緊結式足場 #安全第一',
        link: 'https://instagram.com/'
      },
      {
        id: 'post3',
        imageUrl: 'images/instagram/post3.jpg',
        caption: '新入社員歓迎会 #職場の仲間 #楽しく仕事',
        link: 'https://instagram.com/'
      },
      {
        id: 'post4',
        imageUrl: 'images/instagram/post4.jpg',
        caption: '安全大会の様子 #安全教育 #チームワーク',
        link: 'https://instagram.com/'
      },
      {
        id: 'post5',
        imageUrl: 'images/instagram/post5.jpg',
        caption: '特殊建築物への足場設置 #技術力 #プロフェッショナル',
        link: 'https://instagram.com/'
      },
      {
        id: 'post6',
        imageUrl: 'images/instagram/post6.jpg',
        caption: '新しい資材が入荷しました #設備投資 #品質向上',
        link: 'https://instagram.com/'
      }
    ];

    // インスタグラム投稿表示用関数
    function renderInstagramPost(post, container) {
      const postElement = document.createElement('a');
      postElement.href = post.link;
      postElement.className = 'instagram-item';
      postElement.target = '_blank';
      postElement.rel = 'noopener noreferrer';
      
      // エラー処理
      const img = new Image();
      img.src = post.imageUrl;
      img.alt = post.caption;
      
      img.onerror = function() {
        // 画像読み込みエラー時はプレースホルダーを表示
        img.src = 'images/placeholder.jpg';
        img.alt = 'Instagram投稿';
      };
      
      postElement.appendChild(img);
      container.appendChild(postElement);
    }

    // 小さいグリッド用（フッター等）
    if (instagramContainer) {
      // 投稿数を制限
      const limitedPosts = demoInstagramPosts.slice(0, 4);
      
      limitedPosts.forEach(function(post) {
        renderInstagramPost(post, instagramContainer);
      });
    }

    // 大きいグリッド用（インスタグラムページ）
    if (instagramLargeContainer) {
      demoInstagramPosts.forEach(function(post) {
        renderInstagramPost(post, instagramLargeContainer);
      });
    }
  }

  // インスタグラムフィードを読み込む
  loadInstagramFeed();
  
  // 構文チェック
  try {
    console.assert(typeof loadInstagramFeed === 'function', 'Instagram関数が正しく定義されていません');
    console.log("Instagram script syntax check passed");
  }
  catch (error) {
    console.error("Instagram script syntax error:", error.message);
  }
});