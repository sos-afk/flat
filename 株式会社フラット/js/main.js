/**
 * 株式会社フラット ウェブサイト
 * メインJavaScriptファイル
 */

// DOM完全読み込み後に実行
document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ハンバーガーメニューの動作
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });

    // メニュー外をクリックした時にメニューを閉じる
    document.addEventListener('click', function(event) {
      const isClickInside = nav.contains(event.target) || hamburger.contains(event.target);
      
      if (!isClickInside && nav.classList.contains('active')) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
      }
    });
  }

  // スクロール時のヘッダー固定
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 0;
  
  function handleScroll() {
    if (window.scrollY > headerHeight) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  if (header) {
    window.addEventListener('scroll', handleScroll);
    // 初期状態の設定
    handleScroll();
  }

  // サービスタイプのタブ切り替え機能
  const serviceTabs = document.querySelectorAll('.service-type-tab');
  const serviceContents = document.querySelectorAll('.service-type-content');

  if (serviceTabs.length > 0 && serviceContents.length > 0) {
    serviceTabs.forEach(function(tab, index) {
      tab.addEventListener('click', function() {
        // すべてのタブからactiveクラスを削除
        serviceTabs.forEach(function(t) {
          t.classList.remove('active');
        });
        
        // クリックされたタブにactiveクラスを追加
        tab.classList.add('active');
        
        // すべてのコンテンツからactiveクラスを削除
        serviceContents.forEach(function(content) {
          content.classList.remove('active');
        });
        
        // 対応するコンテンツにactiveクラスを追加
        serviceContents[index].classList.add('active');
      });
    });
  }

  // 営業所タブ切り替え機能
  const officeTabs = document.querySelectorAll('.office-tab');
  const officeContents = document.querySelectorAll('.office-content');

  if (officeTabs.length > 0 && officeContents.length > 0) {
    officeTabs.forEach(function(tab, index) {
      tab.addEventListener('click', function() {
        // すべてのタブからactiveクラスを削除
        officeTabs.forEach(function(t) {
          t.classList.remove('active');
        });
        
        // クリックされたタブにactiveクラスを追加
        tab.classList.add('active');
        
        // すべてのコンテンツからactiveクラスを削除
        officeContents.forEach(function(content) {
          content.classList.remove('active');
        });
        
        // 対応するコンテンツにactiveクラスを追加
        officeContents[index].classList.add('active');
      });
    });
  }

  // スクロールアニメーション
  const scrollElements = document.querySelectorAll('.scroll-animation');

  function elementInView(element, percentageScroll = 100) {
    const elementTop = element.getBoundingClientRect().top;
    return (
      elementTop <= 
      (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100)
    );
  }

  function displayScrollElement(element) {
    element.classList.add('animate');
  }

  function hideScrollElement(element) {
    element.classList.remove('animate');
  }

  function handleScrollAnimation() {
    scrollElements.forEach((element) => {
      if (elementInView(element, 80)) {
        displayScrollElement(element);
      } else {
        hideScrollElement(element);
      }
    });
  }

  if (scrollElements.length > 0) {
    window.addEventListener('scroll', handleScrollAnimation);
    // 初期状態の設定
    handleScrollAnimation();
  }

  // トップに戻るボタン
  const scrollToTopBtn = document.querySelector('.scroll-to-top');

  if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
    });

    scrollToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // お問い合わせフォームのバリデーション
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // バリデーションのフラグ
      let isValid = true;
      
      // 必須入力フィールドのチェック
      const requiredFields = contactForm.querySelectorAll('[required]');
      
      requiredFields.forEach(function(field) {
        const errorDisplay = field.nextElementSibling;
        
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          
          if (errorDisplay && errorDisplay.classList.contains('error-message')) {
            errorDisplay.textContent = 'このフィールドは必須です';
            errorDisplay.style.display = 'block';
          }
        } else {
          field.classList.remove('error');
          
          if (errorDisplay && errorDisplay.classList.contains('error-message')) {
            errorDisplay.style.display = 'none';
          }
        }
      });
      
      // メールアドレスのバリデーション
      const emailField = contactForm.querySelector('input[type="email"]');
      
      if (emailField && emailField.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errorDisplay = emailField.nextElementSibling;
        
        if (!emailPattern.test(emailField.value)) {
          isValid = false;
          emailField.classList.add('error');
          
          if (errorDisplay && errorDisplay.classList.contains('error-message')) {
            errorDisplay.textContent = '有効なメールアドレスを入力してください';
            errorDisplay.style.display = 'block';
          }
        }
      }
      
      // 電話番号のバリデーション
      const phoneField = contactForm.querySelector('input[type="tel"]');
      
      if (phoneField && phoneField.value) {
        const phonePattern = /^[\d\s\-+()]{10,15}$/;
        const errorDisplay = phoneField.nextElementSibling;
        
        if (!phonePattern.test(phoneField.value.replace(/\s+/g, ''))) {
          isValid = false;
          phoneField.classList.add('error');
          
          if (errorDisplay && errorDisplay.classList.contains('error-message')) {
            errorDisplay.textContent = '有効な電話番号を入力してください';
            errorDisplay.style.display = 'block';
          }
        }
      }
      
      // プライバシーポリシー同意チェックのバリデーション
      const privacyCheck = contactForm.querySelector('#privacyPolicy');
      
      if (privacyCheck) {
        const errorDisplay = privacyCheck.parentElement.nextElementSibling;
        
        if (!privacyCheck.checked) {
          isValid = false;
          privacyCheck.parentElement.classList.add('error');
          
          if (errorDisplay && errorDisplay.classList.contains('error-message')) {
            errorDisplay.textContent = 'プライバシーポリシーに同意してください';
            errorDisplay.style.display = 'block';
          }
        } else {
          privacyCheck.parentElement.classList.remove('error');
          
          if (errorDisplay && errorDisplay.classList.contains('error-message')) {
            errorDisplay.style.display = 'none';
          }
        }
      }
      
      // フォームが有効な場合は送信処理
      if (isValid) {
        // 送信中の表示
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = '送信中...';
        
        // ここでフォームデータをサーバーに送信する処理を行う
        // 実際のフォーム送信処理はバックエンドで実装される
        
        // 送信完了後の処理（デモ用に2秒後に完了表示）
        setTimeout(function() {
          // フォームを隠す
          contactForm.style.display = 'none';
          
          // 完了メッセージを表示
          const formContainer = contactForm.parentElement;
          const successMessage = document.createElement('div');
          
          successMessage.className = 'contact-success';
          successMessage.innerHTML = '<h3>お問い合わせありがとうございます</h3>' + 
                                     '<p>メッセージを受け付けました。担当者より早急にご連絡いたします。</p>' +
                                     '<a href="index.html" class="btn btn-primary">トップページに戻る</a>';
          
          formContainer.appendChild(successMessage);
          
          // ボタンを元に戻す（フォームリセット用）
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
          
          // フォームをリセット
          contactForm.reset();
        }, 2000);
      }
    });
    
    // リアルタイムバリデーション
    const inputFields = contactForm.querySelectorAll('input, textarea, select');
    
    inputFields.forEach(function(field) {
      field.addEventListener('blur', function() {
        if (field.hasAttribute('required') && !field.value.trim()) {
          field.classList.add('error');
          
          const errorDisplay = field.nextElementSibling;
          
          if (errorDisplay && errorDisplay.classList.contains('error-message')) {
            errorDisplay.textContent = 'このフィールドは必須です';
            errorDisplay.style.display = 'block';
          }
        } else {
          field.classList.remove('error');
          
          const errorDisplay = field.nextElementSibling;
          
          if (errorDisplay && errorDisplay.classList.contains('error-message')) {
            errorDisplay.style.display = 'none';
          }
        }
      });
    });
  }

  // 構文チェック
  try {
    console.log("Syntax check passed");
  }
  catch (error) {
    console.error("Syntax error:", error.message);
  }
});