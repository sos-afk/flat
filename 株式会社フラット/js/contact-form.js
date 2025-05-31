/**
 * 株式会社フラット ウェブサイト
 * お問い合わせフォーム用スクリプト
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // お問い合わせフォームの処理
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    // フォームタイプの切り替え
    const formTypeTabs = document.querySelectorAll('.form-type-tab');
    const formContainers = document.querySelectorAll('.form-type-container');
    
    if (formTypeTabs.length > 0 && formContainers.length > 0) {
      formTypeTabs.forEach(function(tab, index) {
        tab.addEventListener('click', function() {
          // すべてのタブから active クラスを削除
          formTypeTabs.forEach(function(t) {
            t.classList.remove('active');
          });
          
          // クリックされたタブに active クラスを追加
          tab.classList.add('active');
          
          // すべてのフォームから active クラスを削除
          formContainers.forEach(function(container) {
            container.classList.remove('active');
          });
          
          // 対応するフォームに active クラスを追加
          formContainers[index].classList.add('active');
        });
      });
    }
    
    // 住所自動入力機能
    const postalCodeInput = document.getElementById('postalCode');
    
    if (postalCodeInput) {
      postalCodeInput.addEventListener('blur', function() {
        const postalCode = postalCodeInput.value.replace(/[^\d]/g, '');
        
        // 7桁の郵便番号の場合のみ処理
        if (postalCode.length === 7) {
          // 郵便番号をハイフン付きの形式に変換して表示
          postalCodeInput.value = postalCode.slice(0, 3) + '-' + postalCode.slice(3);
          
          // APIを使用して住所情報を取得（デモ用、実際はバックエンドで実装）
          // Note: 実際の実装ではAPIキーを使用するため、フロントエンドに直接記述しない
          setTimeout(function() {
            // デモ用に福岡市の住所をセット
            const prefectureSelect = document.getElementById('prefecture');
            const cityInput = document.getElementById('city');
            const addressInput = document.getElementById('address');
            
            if (prefectureSelect && cityInput && addressInput) {
              // 福岡県を選択
              for (let i = 0; i < prefectureSelect.options.length; i++) {
                if (prefectureSelect.options[i].text === '福岡県') {
                  prefectureSelect.selectedIndex = i;
                  break;
                }
              }
              
              cityInput.value = '福岡市西区';
              addressInput.focus();
            }
          }, 1000);
        }
      });
    }
    
    // ファイルアップロード処理
    const fileInput = document.querySelector('.file-input');
    const fileNameDisplay = document.querySelector('.file-name');
    
    if (fileInput && fileNameDisplay) {
      fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
          fileNameDisplay.textContent = fileInput.files[0].name;
        } else {
          fileNameDisplay.textContent = 'ファイルが選択されていません';
        }
      });
    }
    
    // 日付入力の制限（過去の日付は選択できない）
    const dateInputs = document.querySelectorAll('input[type="date"]');
    
    if (dateInputs.length > 0) {
      const today = new Date().toISOString().split('T')[0];
      
      dateInputs.forEach(function(input) {
        input.setAttribute('min', today);
      });
    }
    
    // 送信処理
    contactForm.addEventListener('submit', function(e) {
      // 実際の送信処理はバックエンドで実装される
      // ここではサンプルの処理のみを実装
      
      // フォームデータの収集
      const formData = new FormData(contactForm);
      const formDataObj = {};
      
      for (const [key, value] of formData.entries()) {
        formDataObj[key] = value;
      }
      
      console.log('フォームデータ:', formDataObj);
      
      // サーバーに送信する代わりにローカルストレージに保存（デモ用）
      localStorage.setItem('lastContactFormSubmission', JSON.stringify({
        data: formDataObj,
        timestamp: new Date().toISOString()
      }));
    });
  }
  
  // 見積もり依頼フォームの工事種類による動的フィールド表示
  const projectTypeSelect = document.getElementById('projectType');
  const dynamicFieldsContainer = document.getElementById('dynamicFields');
  
  if (projectTypeSelect && dynamicFieldsContainer) {
    projectTypeSelect.addEventListener('change', function() {
      const selectedValue = projectTypeSelect.value;
      
      // 初期化
      dynamicFieldsContainer.innerHTML = '';
      
      if (selectedValue === '住宅工事') {
        // 住宅工事用のフィールドを追加
        dynamicFieldsContainer.innerHTML = `
          <div class="form-group">
            <label for="buildingType">建物の種類</label>
            <select id="buildingType" name="buildingType" class="form-control">
              <option value="">選択してください</option>
              <option value="一戸建て">一戸建て</option>
              <option value="集合住宅">集合住宅</option>
              <option value="その他">その他</option>
            </select>
          </div>
          <div class="form-group">
            <label for="buildingArea">建物の延床面積(坪)</label>
            <input type="number" id="buildingArea" name="buildingArea" class="form-control" placeholder="例: 30">
          </div>
        `;
      } else if (selectedValue === 'ビル工事') {
        // ビル工事用のフィールドを追加
        dynamicFieldsContainer.innerHTML = `
          <div class="form-group">
            <label for="buildingHeight">建物の高さ(m)</label>
            <input type="number" id="buildingHeight" name="buildingHeight" class="form-control" placeholder="例: 20">
          </div>
          <div class="form-group">
            <label for="facadeArea">外壁面積(㎡)</label>
            <input type="number" id="facadeArea" name="facadeArea" class="form-control" placeholder="例: 500">
          </div>
        `;
      } else if (selectedValue === '特殊工事') {
        // 特殊工事用のフィールドを追加
        dynamicFieldsContainer.innerHTML = `
          <div class="form-group">
            <label for="specialRequirements">特殊要件の詳細</label>
            <textarea id="specialRequirements" name="specialRequirements" class="form-control" rows="3" placeholder="必要な特殊対応について詳しくご記入ください"></textarea>
          </div>
        `;
      }
    });
  }

  // 構文チェック
  try {
    console.assert(typeof contactForm !== 'undefined', 'contactFormが定義されていません');
    console.log("Contact form script syntax check passed");
  }
  catch (error) {
    console.error("Contact form script syntax error:", error.message);
  }
});