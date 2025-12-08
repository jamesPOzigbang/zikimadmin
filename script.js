
// Mock Dummy Data
const reportData = Array.from({ length: 15 }, (_, i) => ({
    id: `RPT-2023-${(1000 + i).toString()}`,
    date: `2023-12-${String(Math.max(1, 30 - i)).padStart(2, '0')} 14:30`,
    address: `서울시 강남구 테헤란로 ${100 + i}길 ${i + 1}`,
    type: i % 3 === 0 ? '아파트' : i % 3 === 1 ? '빌라' : '오피스텔',
    purpose: i % 2 === 0 ? '매매' : '전세',
    payment: '카드결제',
    status: ['완료', '진행중', '취소'][i % 3],
    // New Fields
    period: '24개월',
    deposit: '1억 5,000만원',
    marketValue: '2억 5,620만원',
    debt: '0원',
    available: '1억 620만원',
    priority: '5,000만원 가능'
}));

// Checklist Items Definition
const checklistItems = [
    "위반건축물", "대지권", "토지별도등기", "가등기", "압류/가압류",
    "처분금지가처분", "신탁", "경매개시결정", "근저당권", "임차권등기명령",
    "전세권", "민간임대주택등록 여부", "등기사항 변경예정", "건물,토지 소유자 일치",
    "임대사업자 등록", "보증금미반환 이력", "기존채무금액", "여유금액",
    "보증보험 예비심사", "보증금 대출 예비 심사", "최우선 변제권"
];

// DOM Elements
const tableBody = document.getElementById('reportTableBody');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the detail page
    const urlParams = new URLSearchParams(window.location.search);
    const reportId = urlParams.get('id');

    if (reportId) {
        renderReportDetail(reportId);
    } else {
        renderTable(reportData);
    }
});

// Render Table
function renderTable(data) {
    if (!tableBody) return;

    tableBody.innerHTML = data.map(item => `
        <tr onclick="openReportDetail('${item.id}')">
            <td><span style="font-family: monospace; font-weight: 500;">${item.id}</span></td>
            <td>${item.date}</td>
            <td>${item.address}</td>
            <td>${item.type}</td>
            <td>${item.purpose}</td>
            <td>${item.payment}</td>
            <td>${getStatusBadge(item.status)}</td>
        </tr>
    `).join('');
}

// Navigation Function
window.openReportDetail = (id) => {
    window.location.href = `report-detail.html?id=${id}`;
};

// Helper: Status Badge
function getStatusBadge(status) {
    let className = 'badge-neutral';
    if (status === '완료') className = 'badge-success';
    if (status === '진행중') className = 'badge-warning';
    if (status === '취소') className = 'badge-danger';

    return `<span class="badge ${className}">${status}</span>`;
}

// Helper: Get Random Status for Mock Data
function getMockStatusCheck(index) {
    // Deterministic random based on index
    const isGood = (index * 7 + 3) % 10 > 2; // 70% Good, 30% Need Check
    return isGood ? 'good' : 'check';
}

function getStatusLabel(status) {
    return status === 'good' ? '양호' : '확인 필요';
}

function getStatusClass(status) {
    return status === 'good' ? 'good' : 'check';
}

function getMockContent(status, item) {
    if (status === 'good') {
        return "특이사항 없습니다.";
    } else {
        return `[${item}] 관련하여 추가적인 확인이 필요합니다. 상세 내역을 검토해주시기 바랍니다.`;
    }
}

// Render Detail Page
function renderReportDetail(id) {
    const report = reportData.find(item => item.id === id);
    if (!report) {
        const contentDiv = document.getElementById('reportDetailContent');
        if (contentDiv) contentDiv.innerHTML = '<p>리포트를 찾을 수 없습니다.</p>';
        return;
    }

    const headerEl = document.getElementById('reportIdHeader');
    if (headerEl) headerEl.textContent = `리포트 ID: ${report.id} (${report.address})`;

    // Generate Checklist Grid
    const checklistHtml = checklistItems.map((item, index) => {
        const status = getMockStatusCheck(index); // 'good' or 'check'
        const content = getMockContent(status, item);

        let specialTermsHtml = '';
        if (status === 'check') {
            specialTermsHtml = `
                <div class="detail-content-group" style="margin-top: 16px; border-top: 1px dashed var(--border-color); padding-top: 16px;">
                    <span class="detail-title" style="color: #ea580c;">특약 사항</span>
                    <div class="detail-text" style="background-color: #fff7ed; border-color: #fed7aa; color: #9a3412;">
                        본 항목과 관련하여 임대차 계약서에 특약 사항을 필수로 기재해야 합니다.
                    </div>
                </div>
            `;
        }

        return `
            <div class="checklist-item">
                <div class="checklist-header">
                    <label class="checklist-label">${item}</label>
                    <span class="status-indicator ${getStatusClass(status)}">
                        ${getStatusLabel(status)}
                    </span>
                </div>
                
                <div class="detail-content-group">
                    <span class="detail-title">상세 내용</span>
                    <div class="detail-text">
                        ${content}
                    </div>
                </div>
                
                 <div class="detail-content-group">
                    <span class="detail-title">관리자 가이드</span>
                    <div class="detail-text" style="color: var(--text-muted);">
                        가이드 내용이 여기에 표시됩니다.
                    </div>
                </div>

                ${specialTermsHtml}
            </div>
        `;
    }).join('');

    const contentDiv = document.getElementById('reportDetailContent');
    if (contentDiv) {
        contentDiv.innerHTML = `
            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 16px; color: var(--text-primary);">매물 요약</h3>
            <div class="card" style="padding: 24px; margin-bottom: 24px;">
                <div class="detail-grid" style="grid-template-columns: repeat(4, 1fr); gap: 24px;">
                    <div>
                        <div class="detail-label">발급 일시</div>
                        <div style="font-weight: 500;">${report.date}</div>
                    </div>
                    <div>
                        <div class="detail-label">계약 기간</div>
                        <div style="font-weight: 500;">${report.period}</div>
                    </div>
                    <div>
                        <div class="detail-label">보증금</div>
                        <div style="font-weight: 500;">${report.deposit}</div>
                    </div>
                    <div>
                        <div class="detail-label">시세 추정가</div>
                        <div style="font-weight: 500;">${report.marketValue}</div>
                    </div>
                    <div>
                        <div class="detail-label">등기부등본 융자</div>
                        <div style="font-weight: 500;">${report.debt}</div>
                    </div>
                    <div>
                        <div class="detail-label">보증 가입 가능 여유금액</div>
                        <div style="font-weight: 700; color: var(--primary-color);">${report.available}</div>
                    </div>
                    <div>
                        <div class="detail-label">최우선 변제금</div>
                        <div style="font-weight: 500;">${report.priority}</div>
                    </div>
                </div>

                <!-- PDF Documents -->
                <div style="margin-top: 24px; border-top: 1px solid var(--border-color); padding-top: 24px; display: flex; gap: 12px;">
                    <button class="btn btn-outline" style="border-radius: 6px; font-size: 14px; padding: 10px 16px; display: flex; align-items: center; gap: 8px;">
                        <span>📄</span> 건물 등기부등본 PDF
                    </button>
                    <button class="btn btn-outline" style="border-radius: 6px; font-size: 14px; padding: 10px 16px; display: flex; align-items: center; gap: 8px;">
                         <span>📄</span> 토지 등기부등본 PDF
                    </button>
                </div>
            </div>

            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 16px; color: var(--text-primary);">진단 항목 상세</h3>
            <div class="checklist-grid">
                ${checklistHtml}
            </div>

            <!-- Crime/Safety Section -->
            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 16px; margin-top: 48px; color: var(--text-primary);">범죄/치안</h3>
            <div class="safety-section" style="border-top: none; margin-top: 0; padding-top: 0;">
                <div class="checklist-grid">
                    <!-- 1. Facilities Map -->
                    <div class="safety-card">
                        <div class="checklist-header" style="border-bottom: none; margin-bottom: 0; padding-bottom: 16px;">
                            <label class="checklist-label">방범 시설 분포</label>
                            <span style="font-size: 12px; color: #94a3b8; font-weight: 400;">반경 500m 기준</span>
                        </div>
                        <div class="map-placeholder">지도 데이터 (방범 CCTV, 안전통합관제센터 등)</div>
                        <div class="stat-list">
                            <div class="stat-row">
                                <span style="display:flex; align-items:center; gap:6px;">📷 방범 CCTV</span>
                                <span style="font-weight:600;">264개</span>
                            </div>
                            <div class="stat-row">
                                <span style="display:flex; align-items:center; gap:6px;">🚨 안전비상벨</span>
                                <span style="font-weight:600;">143개</span>
                            </div>
                             <div class="stat-row">
                                <span style="display:flex; align-items:center; gap:6px;">👮 경찰서/파출소</span>
                                <span style="font-weight:600;">2곳</span>
                            </div>
                             <div class="stat-row">
                                <span style="display:flex; align-items:center; gap:6px;">🚒 소방서</span>
                                <span style="font-weight:600;">0곳</span>
                            </div>
                            <div class="stat-row">
                                <span style="display:flex; align-items:center; gap:6px;">🏪 24시 편의점</span>
                                <span style="font-weight:600;">12곳</span>
                            </div>
                        </div>
                    </div>

                    <!-- 2. Safe Route -->
                    <div class="safety-card">
                         <div class="checklist-header" style="border-bottom: none; margin-bottom: 0; padding-bottom: 16px;">
                            <label class="checklist-label">안전 귀갓길 체크</label>
                            <span style="font-size: 12px; color: #94a3b8; font-weight: 400;">최단거리 도보 기준</span>
                        </div>
                        <div class="map-placeholder">지도 데이터 (안전 귀갓길 경로 표시)</div>
                        <div class="stat-list">
                            <div class="stat-row">
                                 <span style="display:flex; align-items:center; gap:6px;">🔵 경로 내, 방범 CCTV</span>
                                <span style="font-weight:600;">5개</span>
                            </div>
                            <div class="stat-row">
                                 <span style="display:flex; align-items:center; gap:6px;">🔴 경로 내, 안전비상벨</span>
                                <span style="font-weight:600;">2개</span>
                            </div>
                        </div>
                    </div>

                    <!-- 3. Entertainment Venues -->
                    <div class="safety-card">
                        <div class="checklist-header" style="border-bottom: none; margin-bottom: 0; padding-bottom: 16px;">
                            <label class="checklist-label">동네 유흥업소 수 비교</label>
                            <span style="font-size: 12px; color: #94a3b8; font-weight: 400;">반경 500m 기준</span>
                        </div>
                        <div class="bar-chart">
                             <div class="bar-row">
                                <span class="bar-label">망원동</span>
                                <div class="bar-track"><div class="bar-fill" style="width: 20%; background:#cbd5e1;">512</div></div>
                            </div>
                             <div class="bar-row">
                                <span class="bar-label">서교동</span>
                                <div class="bar-track"><div class="bar-fill" style="width: 80%; background:#94a3b8;">2,846</div></div>
                            </div>
                            <div class="bar-row">
                                <span class="bar-label"><strong>성산동</strong></span>
                                <div class="bar-track"><div class="bar-fill" style="width: 50%; background:#009720; color:white;">1,032</div></div>
                            </div>
                        </div>
                    </div>

                    <!-- 4. Crime Stats -->
                    <div class="safety-card">
                        <div class="checklist-header" style="border-bottom: none; margin-bottom: 0; padding-bottom: 16px;">
                            <label class="checklist-label">지난해 범죄 발생 수 비교</label>
                            <span style="font-size: 12px; color: #94a3b8; font-weight: 400;">출처: 경찰청</span>
                        </div>
                    <!-- Simple Bar Chart Visualization for Crime -->
                     <div style="display:flex; justify-content:space-around; align-items:flex-end; height:120px; padding-bottom:10px;">
                        <div style="text-align:center;">
                            <div style="width:40px; height:60px; background:#bbf7d0; margin:0 auto; border-radius:4px 4px 0 0; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:600;">98건</div>
                            <div style="margin-top:8px; font-size:12px; font-weight:600;">마포구</div>
                        </div>
                         <div style="text-align:center;">
                            <div style="width:40px; height:80px; background:#cbd5e1; margin:0 auto; border-radius:4px 4px 0 0; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:600;">121건</div>
                            <div style="margin-top:8px; font-size:12px; color:#64748b;">은평구</div>
                        </div>
                         <div style="text-align:center;">
                            <div style="width:40px; height:50px; background:#cbd5e1; margin:0 auto; border-radius:4px 4px 0 0; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:600;">76건</div>
                            <div style="margin-top:8px; font-size:12px; color:#64748b;">서대문구</div>
                        </div>
                     </div>
                    </div>
                </div>
            </div>

            <!-- Living/Convenience Section -->
            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 16px; margin-top: 48px; color: var(--text-primary);">생활/편의</h3>
            <div class="safety-section" style="border-top: none; margin-top: 0; padding-top: 0;">
                <div class="checklist-grid">
                    <!-- 1. Convenience Facilities -->
                    <div class="safety-card">
                        <div class="checklist-header" style="border-bottom: none; margin-bottom: 0; padding-bottom: 16px;">
                            <label class="checklist-label">편의 시설</label>
                            <span style="font-size: 12px; color: #94a3b8; font-weight: 400;">반경 500m 기준</span>
                        </div>
                        <div class="map-placeholder">지도 데이터 (편의점, 병원, 카페 등 위치 표시)</div>
                        <div class="stat-list">
                            <div class="stat-row">
                                <span style="display:flex; align-items:center; gap:6px;">🏪 24시 편의점</span>
                                <span style="font-weight:600;">14곳</span>
                            </div>
                            <div class="stat-row">
                                <span style="display:flex; align-items:center; gap:6px;">🏥 병원/약국</span>
                                <span style="font-weight:600;">21개</span>
                            </div>
                             <div class="stat-row">
                                <span style="display:flex; align-items:center; gap:6px;">☕ 외식/카페</span>
                                <span style="font-weight:600;">45개</span>
                            </div>
                             <div class="stat-row">
                                <span style="display:flex; align-items:center; gap:6px;">🏫 교육/학원가</span>
                                <span style="font-weight:600;">5곳</span>
                            </div>
                            <div class="stat-row">
                                <span style="display:flex; align-items:center; gap:6px;">🛒 대형마트</span>
                                <span style="font-weight:600;">0곳</span>
                            </div>
                             <div class="stat-row">
                                <span style="display:flex; align-items:center; gap:6px;">🚌 대중교통</span>
                                <span style="font-weight:600;">2곳</span>
                            </div>
                        </div>
                    </div>

                    <!-- 2. Compare with My Neighborhood -->
                    <div class="safety-card">
                         <div class="checklist-header" style="border-bottom: none; margin-bottom: 0; padding-bottom: 16px;">
                            <label class="checklist-label">내 동네와 비교하기</label>
                        </div>

                        <!-- Radar Chart Mockup -->
                        <div style="width:100%; height:240px; position:relative; display:flex; justify-content:center; align-items:center;">
                            <svg width="240" height="240" viewBox="0 0 200 200">
                                <!-- Grid -->
                                <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" fill="none" stroke="#e2e8f0" stroke-width="1"/>
                                <polygon points="100,40 152,70 152,130 100,160 48,130 48,70" fill="none" stroke="#e2e8f0" stroke-width="1"/>
                                <line x1="100" y1="100" x2="100" y2="20" stroke="#e2e8f0" stroke-width="1"/>
                                <line x1="100" y1="100" x2="170" y2="60" stroke="#e2e8f0" stroke-width="1"/>
                                <line x1="100" y1="100" x2="170" y2="140" stroke="#e2e8f0" stroke-width="1"/>
                                <line x1="100" y1="100" x2="100" y2="180" stroke="#e2e8f0" stroke-width="1"/>
                                <line x1="100" y1="100" x2="30" y2="140" stroke="#e2e8f0" stroke-width="1"/>
                                <line x1="100" y1="100" x2="30" y2="60" stroke="#e2e8f0" stroke-width="1"/>
                                
                                <!-- Data Shape (Orange) -->
                                <polygon points="100,50 160,80 155,135 100,150 45,120 40,75" fill="rgba(249, 115, 22, 0.2)" stroke="#f97316" stroke-width="2"/>
                                
                                <!-- Labels -->
                                <text x="100" y="15" text-anchor="middle" font-size="10" fill="#64748b">편의점</text>
                                <text x="180" y="60" text-anchor="start" font-size="10" fill="#64748b">대형마트</text>
                                <text x="180" y="145" text-anchor="start" font-size="10" fill="#64748b">대중교통</text>
                                <text x="100" y="195" text-anchor="middle" font-size="10" fill="#64748b">교육/학원가</text>
                                <text x="20" y="145" text-anchor="end" font-size="10" fill="#64748b">외식/카페</text>
                                <text x="20" y="60" text-anchor="end" font-size="10" fill="#64748b">병원/약국</text>
                            </svg>
                            
                            <!-- Legend -->
                            <div style="position:absolute; bottom:0; width:100%; display:flex; justify-content:center; gap:16px; font-size:11px;">
                                <div style="display:flex; align-items:center; gap:4px;">
                                    <div style="width:12px; height:2px; background:#f97316;"></div> 이 동네
                                </div>
                                <div style="display:flex; align-items:center; gap:4px;">
                                    <div style="width:12px; height:2px; background:#94a3b8; border-top:1px dashed #94a3b8;"></div> 내 동네(목동)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
