export function mountUtilitiesLab({ root, cards = [], onStatus } = {}) {
    if (!root) {
        throw new Error('Utilities root container is required.');
    }

    root.innerHTML = `
        <div class="tool-panel reveal active" id="tool-panel">
            <div class="tool-panel-head">
                <div>
                    <div class="tool-panel-tag">// Utility Console</div>
                    <h3 class="tool-panel-title" id="tool-panel-title">Base64 Converter</h3>
                </div>
                <div class="tool-privacy">Client-side only | No payload storage</div>
            </div>
            <div class="tool-alert" id="tool-alert">Ready.</div>

            <div class="tool-body">
                <section class="tool-screen active" id="tool-base64">
                    <div class="tool-grid">
                        <div class="tool-group">
                            <label class="tool-label" for="b64-input">Input</label>
                            <textarea id="b64-input" class="tool-textarea" placeholder="Enter text or Base64 payload"></textarea>
                        </div>
                        <div class="tool-group">
                            <label class="tool-label" for="b64-output">Output</label>
                            <textarea id="b64-output" class="tool-textarea tool-output" readonly placeholder="Output appears here"></textarea>
                        </div>
                    </div>
                    <div class="tool-row">
                        <button type="button" class="tool-small-btn" id="b64-encode-btn">Encode</button>
                        <button type="button" class="tool-small-btn" id="b64-decode-btn">Decode</button>
                        <button type="button" class="tool-small-btn" id="b64-clear-btn">Clear</button>
                    </div>
                </section>

                <section class="tool-screen" id="tool-hash">
                    <div class="tool-group">
                        <label class="tool-label" for="hash-input">Input</label>
                        <textarea id="hash-input" class="tool-textarea" placeholder="String to hash with SHA-256"></textarea>
                    </div>
                    <div class="tool-row">
                        <button type="button" class="tool-small-btn" id="hash-generate-btn">Generate Hash</button>
                        <button type="button" class="tool-small-btn" id="hash-copy-btn">Copy Hash</button>
                        <button type="button" class="tool-small-btn" id="hash-clear-btn">Clear</button>
                    </div>
                    <div class="tool-group">
                        <label class="tool-label" for="hash-output">SHA-256 (hex)</label>
                        <textarea id="hash-output" class="tool-textarea tool-output" readonly placeholder="Hash output"></textarea>
                    </div>
                </section>

                <section class="tool-screen" id="tool-jwt">
                    <div class="tool-group">
                        <label class="tool-label" for="jwt-input">JWT Token</label>
                        <textarea id="jwt-input" class="tool-textarea" placeholder="eyJhbGciOi..."></textarea>
                    </div>
                    <div class="tool-row">
                        <button type="button" class="tool-small-btn" id="jwt-inspect-btn">Inspect Token</button>
                        <button type="button" class="tool-small-btn" id="jwt-clear-btn">Clear</button>
                    </div>
                    <div class="tool-grid">
                        <div class="tool-group">
                            <label class="tool-label" for="jwt-header-output">Decoded Header</label>
                            <pre id="jwt-header-output" class="tool-json"></pre>
                        </div>
                        <div class="tool-group">
                            <label class="tool-label" for="jwt-payload-output">Decoded Payload</label>
                            <pre id="jwt-payload-output" class="tool-json"></pre>
                        </div>
                    </div>
                    <div class="tool-group">
                        <label class="tool-label" for="jwt-meta-output">Signing Context</label>
                        <pre id="jwt-meta-output" class="tool-kv"></pre>
                    </div>
                    <p class="tool-note">JWT Inspector decodes token segments only and does not verify signatures.</p>
                </section>

                <section class="tool-screen" id="tool-uuid">
                    <div class="tool-row">
                        <label class="tool-label" for="uuid-count">Batch Size</label>
                        <input id="uuid-count" class="tool-input" type="number" min="1" max="500" value="25">
                        <button type="button" class="tool-small-btn" id="uuid-generate-btn">Generate</button>
                        <button type="button" class="tool-small-btn" id="uuid-copy-btn">Copy Batch</button>
                        <button type="button" class="tool-small-btn" id="uuid-clear-btn">Clear</button>
                    </div>
                    <div class="tool-group">
                        <label class="tool-label" for="uuid-output">UUIDv4 Output</label>
                        <textarea id="uuid-output" class="tool-textarea tool-output" readonly placeholder="Generated UUIDs appear line-by-line"></textarea>
                    </div>
                </section>

                <section class="tool-screen" id="tool-password">
                    <div class="tool-group">
                        <label class="tool-label" for="pwd-input">Password Under Review</label>
                        <input id="pwd-input" class="tool-input" type="password" autocomplete="off" placeholder="Type password to analyze">
                    </div>
                    <div class="tool-row">
                        <button type="button" class="tool-small-btn" id="pwd-analyze-btn">Analyze</button>
                        <button type="button" class="tool-small-btn" id="pwd-clear-btn">Clear</button>
                    </div>
                    <div class="pwd-meter"><div class="pwd-meter-fill" id="pwd-meter-fill"></div></div>
                    <div class="pwd-score" id="pwd-score">No password analyzed yet.</div>
                    <div class="tool-kv-grid">
                        <div class="kv-cell">
                            <div class="kv-label">Length</div>
                            <div class="kv-value" id="pwd-length">-</div>
                        </div>
                        <div class="kv-cell">
                            <div class="kv-label">Entropy Bits</div>
                            <div class="kv-value" id="pwd-entropy">-</div>
                        </div>
                        <div class="kv-cell">
                            <div class="kv-label">Offline Crack Estimate</div>
                            <div class="kv-value" id="pwd-crack">-</div>
                        </div>
                    </div>
                    <div class="tool-group" style="margin-top:12px;">
                        <label class="tool-label">Remediation Hints</label>
                        <ul class="pwd-hints" id="pwd-hints"></ul>
                    </div>
                </section>

                <section class="tool-screen" id="tool-cidr">
                    <div class="tool-row">
                        <label class="tool-label" for="cidr-input">CIDR Input</label>
                        <input id="cidr-input" class="tool-input" type="text" placeholder="Example: 10.10.12.0/24">
                        <button type="button" class="tool-small-btn" id="cidr-calc-btn">Map Range</button>
                        <button type="button" class="tool-small-btn" id="cidr-clear-btn">Clear</button>
                    </div>
                    <div class="tool-kv-grid">
                        <div class="kv-cell"><div class="kv-label">Network</div><div class="kv-value" id="cidr-network">-</div></div>
                        <div class="kv-cell"><div class="kv-label">Broadcast</div><div class="kv-value" id="cidr-broadcast">-</div></div>
                        <div class="kv-cell"><div class="kv-label">First Host</div><div class="kv-value" id="cidr-first">-</div></div>
                        <div class="kv-cell"><div class="kv-label">Last Host</div><div class="kv-value" id="cidr-last">-</div></div>
                        <div class="kv-cell"><div class="kv-label">Subnet Mask</div><div class="kv-value" id="cidr-mask">-</div></div>
                        <div class="kv-cell"><div class="kv-label">Wildcard</div><div class="kv-value" id="cidr-wildcard">-</div></div>
                        <div class="kv-cell"><div class="kv-label">Total Addresses</div><div class="kv-value" id="cidr-total">-</div></div>
                        <div class="kv-cell"><div class="kv-label">Usable Hosts</div><div class="kv-value" id="cidr-usable">-</div></div>
                    </div>
                </section>

                <section class="tool-screen" id="tool-url">
                    <div class="tool-grid">
                        <div class="tool-group">
                            <label class="tool-label" for="url-input">Input</label>
                            <textarea id="url-input" class="tool-textarea" placeholder="Paste URL or payload fragment"></textarea>
                        </div>
                        <div class="tool-group">
                            <label class="tool-label" for="url-output">Output</label>
                            <textarea id="url-output" class="tool-textarea tool-output" readonly placeholder="Result appears here"></textarea>
                        </div>
                    </div>
                    <div class="tool-row">
                        <button type="button" class="tool-small-btn" id="url-encode-btn">Encode URL Component</button>
                        <button type="button" class="tool-small-btn" id="url-decode-btn">Decode URL</button>
                        <button type="button" class="tool-small-btn" id="url-clear-btn">Clear</button>
                    </div>
                </section>
            </div>
        </div>
    `;

    const utilityTitleMap = {
        'tool-base64': 'Base64 Converter',
        'tool-hash': 'Hash Generator',
        'tool-jwt': 'JWT Inspector',
        'tool-uuid': 'UUID Forge',
        'tool-password': 'Password Pulse',
        'tool-cidr': 'CIDR Navigator',
        'tool-url': 'URL Encoder'
    };

    const toolPanel = root.querySelector('#tool-panel');
    const toolPanelTitle = root.querySelector('#tool-panel-title');
    const toolAlert = root.querySelector('#tool-alert');
    const utilityScreens = Array.from(root.querySelectorAll('.tool-screen'));

    function setToolAlert(message, type) {
        if (!toolAlert) return;
        toolAlert.textContent = message;
        toolAlert.classList.remove('success', 'error');
        if (type === 'success' || type === 'error') toolAlert.classList.add(type);
        if (typeof onStatus === 'function') onStatus(message, type);
    }

    function activateUtility(toolId, scrollToPanel) {
        cards.forEach(card => card.classList.toggle('active', card.dataset.toolTarget === toolId));
        utilityScreens.forEach(screen => screen.classList.toggle('active', screen.id === toolId));
        if (toolPanelTitle) {
            toolPanelTitle.textContent = utilityTitleMap[toolId] || 'Utility Console';
        }
        if (scrollToPanel && toolPanel) {
            toolPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function utf8ToBase64(value) {
        const bytes = new TextEncoder().encode(value);
        let binary = '';
        const chunk = 0x8000;
        for (let i = 0; i < bytes.length; i += chunk) {
            binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
        }
        return btoa(binary);
    }

    function base64ToUtf8(value) {
        const cleaned = value.replace(/\s+/g, '');
        const binary = atob(cleaned);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i += 1) {
            bytes[i] = binary.charCodeAt(i);
        }
        return new TextDecoder().decode(bytes);
    }

    async function sha256Hex(value) {
        const data = new TextEncoder().encode(value);
        const digest = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(digest))
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
    }

    function safeJson(raw) {
        try {
            return JSON.stringify(JSON.parse(raw), null, 2);
        } catch {
            return raw;
        }
    }

    function decodeBase64Url(segment) {
        let base64 = segment.replace(/-/g, '+').replace(/_/g, '/');
        const pad = base64.length % 4;
        if (pad) base64 += '='.repeat(4 - pad);
        return base64ToUtf8(base64);
    }

    function formatEpoch(epoch) {
        if (typeof epoch !== 'number' || !Number.isFinite(epoch)) return 'n/a';
        return `${new Date(epoch * 1000).toISOString()} (${epoch})`;
    }

    async function copyToClipboard(value) {
        if (!value) return false;
        try {
            await navigator.clipboard.writeText(value);
            return true;
        } catch {
            const helper = document.createElement('textarea');
            helper.value = value;
            helper.style.position = 'fixed';
            helper.style.opacity = '0';
            document.body.appendChild(helper);
            helper.focus();
            helper.select();
            const copied = document.execCommand('copy');
            document.body.removeChild(helper);
            return copied;
        }
    }

    function generateUuidV4() {
        if (crypto.randomUUID) return crypto.randomUUID();
        const bytes = new Uint8Array(16);
        crypto.getRandomValues(bytes);
        bytes[6] = (bytes[6] & 0x0f) | 0x40;
        bytes[8] = (bytes[8] & 0x3f) | 0x80;
        const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
        return [
            hex.slice(0, 8),
            hex.slice(8, 12),
            hex.slice(12, 16),
            hex.slice(16, 20),
            hex.slice(20)
        ].join('-');
    }

    function parseIPv4(ip) {
        const parts = ip.split('.');
        if (parts.length !== 4) return null;
        let value = 0;
        for (const part of parts) {
            if (!/^\d+$/.test(part)) return null;
            const octet = Number(part);
            if (octet < 0 || octet > 255) return null;
            value = (value << 8) + octet;
        }
        return value >>> 0;
    }

    function intToIPv4(value) {
        return [
            (value >>> 24) & 255,
            (value >>> 16) & 255,
            (value >>> 8) & 255,
            value & 255
        ].join('.');
    }

    function maskFromPrefix(prefix) {
        if (prefix === 0) return 0;
        return (0xffffffff << (32 - prefix)) >>> 0;
    }

    function humanDuration(seconds) {
        if (!Number.isFinite(seconds)) return 'unbounded';
        if (seconds < 1) return '< 1 second';
        const units = [
            ['year', 31536000],
            ['day', 86400],
            ['hour', 3600],
            ['minute', 60],
            ['second', 1]
        ];
        for (const [name, unit] of units) {
            if (seconds >= unit) {
                const value = Math.floor(seconds / unit);
                return `${value} ${name}${value > 1 ? 's' : ''}`;
            }
        }
        return `${Math.round(seconds)} seconds`;
    }

    function evaluatePassword(password) {
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasDigit = /[0-9]/.test(password);
        const hasSymbol = /[^A-Za-z0-9]/.test(password);
        let pool = 0;
        if (hasLower) pool += 26;
        if (hasUpper) pool += 26;
        if (hasDigit) pool += 10;
        if (hasSymbol) pool += 33;
        const entropy = password.length > 0 && pool > 0 ? password.length * Math.log2(pool) : 0;

        let score = 0;
        if (password.length >= 12) score += 1;
        if (hasLower && hasUpper) score += 1;
        if (hasDigit) score += 1;
        if (hasSymbol) score += 1;
        if (entropy >= 60) score += 1;

        let label = 'Weak';
        if (score >= 4) label = 'Strong';
        else if (score === 3) label = 'Good';
        else if (score === 2) label = 'Fair';

        const hints = [];
        if (password.length < 12) hints.push('Increase length to at least 12 characters.');
        if (!hasLower) hints.push('Add lowercase letters.');
        if (!hasUpper) hints.push('Add uppercase letters.');
        if (!hasDigit) hints.push('Add numbers.');
        if (!hasSymbol) hints.push('Add symbols (for example: ! @ # $).');
        if (/(.)\1{2,}/.test(password)) hints.push('Avoid repeated character sequences.');
        if (/(password|admin|qwerty|letmein|welcome|1234|abcd)/i.test(password)) {
            hints.push('Avoid common words and predictable patterns.');
        }
        if (!hints.length && password.length) hints.push('Baseline looks solid. Consider a passphrase for more entropy.');

        return {
            entropy,
            score,
            label,
            crackSeconds: Math.pow(2, entropy) / 1e10,
            hints
        };
    }

    // Base64
    const b64Input = root.querySelector('#b64-input');
    const b64Output = root.querySelector('#b64-output');
    const b64EncodeBtn = root.querySelector('#b64-encode-btn');
    const b64DecodeBtn = root.querySelector('#b64-decode-btn');
    const b64ClearBtn = root.querySelector('#b64-clear-btn');

    b64EncodeBtn?.addEventListener('click', () => {
        const value = b64Input.value;
        if (!value.trim()) {
            setToolAlert('Base64 Converter: input is empty.', 'error');
            return;
        }
        b64Output.value = utf8ToBase64(value);
        setToolAlert('Base64 Converter: encoded successfully.', 'success');
    });

    b64DecodeBtn?.addEventListener('click', () => {
        const value = b64Input.value;
        if (!value.trim()) {
            setToolAlert('Base64 Converter: input is empty.', 'error');
            return;
        }
        try {
            b64Output.value = base64ToUtf8(value);
            setToolAlert('Base64 Converter: decoded successfully.', 'success');
        } catch {
            setToolAlert('Base64 Converter: invalid Base64 payload.', 'error');
        }
    });

    b64ClearBtn?.addEventListener('click', () => {
        b64Input.value = '';
        b64Output.value = '';
        setToolAlert('Base64 Converter: cleared.', 'success');
    });

    // Hash
    const hashInput = root.querySelector('#hash-input');
    const hashOutput = root.querySelector('#hash-output');
    const hashGenerateBtn = root.querySelector('#hash-generate-btn');
    const hashCopyBtn = root.querySelector('#hash-copy-btn');
    const hashClearBtn = root.querySelector('#hash-clear-btn');

    hashGenerateBtn?.addEventListener('click', async () => {
        const value = hashInput.value;
        if (!value.trim()) {
            setToolAlert('Hash Generator: input is empty.', 'error');
            return;
        }
        hashOutput.value = await sha256Hex(value);
        setToolAlert('Hash Generator: SHA-256 generated.', 'success');
    });

    hashCopyBtn?.addEventListener('click', async () => {
        if (!hashOutput.value) {
            setToolAlert('Hash Generator: nothing to copy.', 'error');
            return;
        }
        const copied = await copyToClipboard(hashOutput.value);
        setToolAlert(copied ? 'Hash Generator: hash copied.' : 'Hash Generator: clipboard copy failed.', copied ? 'success' : 'error');
    });

    hashClearBtn?.addEventListener('click', () => {
        hashInput.value = '';
        hashOutput.value = '';
        setToolAlert('Hash Generator: cleared.', 'success');
    });

    // JWT
    const jwtInput = root.querySelector('#jwt-input');
    const jwtHeaderOutput = root.querySelector('#jwt-header-output');
    const jwtPayloadOutput = root.querySelector('#jwt-payload-output');
    const jwtMetaOutput = root.querySelector('#jwt-meta-output');
    const jwtInspectBtn = root.querySelector('#jwt-inspect-btn');
    const jwtClearBtn = root.querySelector('#jwt-clear-btn');

    function resetJwtOutputs() {
        jwtHeaderOutput.textContent = '';
        jwtPayloadOutput.textContent = '';
        jwtMetaOutput.textContent = '';
    }

    jwtInspectBtn?.addEventListener('click', () => {
        const token = jwtInput.value.trim();
        if (!token) {
            setToolAlert('JWT Inspector: token input is empty.', 'error');
            return;
        }
        const parts = token.split('.');
        if (parts.length < 2) {
            setToolAlert('JWT Inspector: token must include at least header.payload.', 'error');
            return;
        }

        try {
            const headerRaw = decodeBase64Url(parts[0]);
            const payloadRaw = decodeBase64Url(parts[1]);
            jwtHeaderOutput.textContent = safeJson(headerRaw);
            jwtPayloadOutput.textContent = safeJson(payloadRaw);

            let headerObj = {};
            let payloadObj = {};
            try { headerObj = JSON.parse(headerRaw); } catch {}
            try { payloadObj = JSON.parse(payloadRaw); } catch {}

            const now = Math.floor(Date.now() / 1000);
            const lines = [];
            lines.push(`algorithm: ${headerObj.alg || 'n/a'}`);
            lines.push(`type: ${headerObj.typ || 'n/a'}`);
            lines.push(`signature_present: ${parts[2] ? 'yes' : 'no'}`);
            lines.push(`signature_length: ${parts[2] ? parts[2].length : 0} chars`);
            if (typeof payloadObj.iat === 'number') lines.push(`issued_at: ${formatEpoch(payloadObj.iat)}`);
            if (typeof payloadObj.nbf === 'number') lines.push(`not_before: ${formatEpoch(payloadObj.nbf)}`);
            if (typeof payloadObj.exp === 'number') {
                lines.push(`expires_at: ${formatEpoch(payloadObj.exp)}`);
                lines.push(`expiration_status: ${payloadObj.exp < now ? 'expired' : 'not expired'}`);
            }

            jwtMetaOutput.textContent = lines.join('\n');
            setToolAlert('JWT Inspector: token decoded successfully (signature not verified).', 'success');
        } catch {
            resetJwtOutputs();
            setToolAlert('JWT Inspector: invalid token encoding.', 'error');
        }
    });

    jwtClearBtn?.addEventListener('click', () => {
        jwtInput.value = '';
        resetJwtOutputs();
        setToolAlert('JWT Inspector: cleared.', 'success');
    });

    // UUID
    const uuidCount = root.querySelector('#uuid-count');
    const uuidOutput = root.querySelector('#uuid-output');
    const uuidGenerateBtn = root.querySelector('#uuid-generate-btn');
    const uuidCopyBtn = root.querySelector('#uuid-copy-btn');
    const uuidClearBtn = root.querySelector('#uuid-clear-btn');

    uuidGenerateBtn?.addEventListener('click', () => {
        const requested = Number(uuidCount.value);
        const total = Number.isFinite(requested) ? Math.min(500, Math.max(1, Math.floor(requested))) : 25;
        uuidCount.value = String(total);
        const list = Array.from({ length: total }, () => generateUuidV4());
        uuidOutput.value = list.join('\n');
        setToolAlert(`UUID Forge: generated ${total} UUIDv4 values.`, 'success');
    });

    uuidCopyBtn?.addEventListener('click', async () => {
        if (!uuidOutput.value) {
            setToolAlert('UUID Forge: nothing to copy.', 'error');
            return;
        }
        const copied = await copyToClipboard(uuidOutput.value);
        setToolAlert(copied ? 'UUID Forge: batch copied.' : 'UUID Forge: clipboard copy failed.', copied ? 'success' : 'error');
    });

    uuidClearBtn?.addEventListener('click', () => {
        uuidOutput.value = '';
        setToolAlert('UUID Forge: cleared.', 'success');
    });

    // Password
    const pwdInput = root.querySelector('#pwd-input');
    const pwdMeterFill = root.querySelector('#pwd-meter-fill');
    const pwdScore = root.querySelector('#pwd-score');
    const pwdLength = root.querySelector('#pwd-length');
    const pwdEntropy = root.querySelector('#pwd-entropy');
    const pwdCrack = root.querySelector('#pwd-crack');
    const pwdHints = root.querySelector('#pwd-hints');
    const pwdAnalyzeBtn = root.querySelector('#pwd-analyze-btn');
    const pwdClearBtn = root.querySelector('#pwd-clear-btn');

    function renderPasswordAnalysis() {
        const value = pwdInput.value;
        if (!value) {
            pwdMeterFill.style.width = '0';
            pwdMeterFill.style.background = '#ff5f57';
            pwdScore.textContent = 'No password analyzed yet.';
            pwdLength.textContent = '-';
            pwdEntropy.textContent = '-';
            pwdCrack.textContent = '-';
            pwdHints.innerHTML = '';
            return;
        }

        const result = evaluatePassword(value);
        const meter = Math.min(100, Math.max(5, (result.entropy / 90) * 100));
        const color = result.score >= 4 ? '#00ff41' : result.score >= 3 ? '#00d4ff' : result.score >= 2 ? '#ffbd2e' : '#ff5f57';

        pwdMeterFill.style.width = `${meter}%`;
        pwdMeterFill.style.background = color;
        pwdScore.textContent = `Strength: ${result.label} (score ${result.score}/5)`;
        pwdLength.textContent = `${value.length} chars`;
        pwdEntropy.textContent = `${result.entropy.toFixed(2)} bits`;
        pwdCrack.textContent = humanDuration(result.crackSeconds);
        pwdHints.innerHTML = result.hints.map(hint => `<li>${hint}</li>`).join('');
    }

    pwdAnalyzeBtn?.addEventListener('click', () => {
        renderPasswordAnalysis();
        if (pwdInput.value) {
            setToolAlert('Password Pulse: analysis complete.', 'success');
        } else {
            setToolAlert('Password Pulse: input is empty.', 'error');
        }
    });

    pwdInput?.addEventListener('input', renderPasswordAnalysis);

    pwdClearBtn?.addEventListener('click', () => {
        pwdInput.value = '';
        renderPasswordAnalysis();
        setToolAlert('Password Pulse: cleared.', 'success');
    });

    // CIDR
    const cidrInput = root.querySelector('#cidr-input');
    const cidrCalcBtn = root.querySelector('#cidr-calc-btn');
    const cidrClearBtn = root.querySelector('#cidr-clear-btn');
    const cidrFieldIds = {
        network: 'cidr-network',
        broadcast: 'cidr-broadcast',
        first: 'cidr-first',
        last: 'cidr-last',
        mask: 'cidr-mask',
        wildcard: 'cidr-wildcard',
        total: 'cidr-total',
        usable: 'cidr-usable'
    };

    function setCidrFields(values) {
        Object.entries(cidrFieldIds).forEach(([key, id]) => {
            const node = root.querySelector(`#${id}`);
            if (!node) return;
            node.textContent = values[key] ?? '-';
        });
    }

    function computeCidr(cidrValue) {
        const match = cidrValue.trim().match(/^(\d{1,3}(?:\.\d{1,3}){3})\/(\d|[12]\d|3[0-2])$/);
        if (!match) return null;
        const ipInt = parseIPv4(match[1]);
        if (ipInt === null) return null;
        const prefix = Number(match[2]);
        const mask = maskFromPrefix(prefix);
        const network = ipInt & mask;
        const broadcast = network | (~mask >>> 0);
        const total = 2 ** (32 - prefix);
        const usable = prefix <= 30 ? Math.max(0, total - 2) : (prefix === 31 ? 2 : 1);
        const first = prefix === 32 ? network : (prefix === 31 ? network : (network + 1) >>> 0);
        const last = prefix === 32 ? network : (prefix === 31 ? broadcast : (broadcast - 1) >>> 0);

        return {
            network: intToIPv4(network),
            broadcast: intToIPv4(broadcast),
            first: intToIPv4(first),
            last: intToIPv4(last),
            mask: intToIPv4(mask),
            wildcard: intToIPv4((~mask) >>> 0),
            total: total.toLocaleString('en-US'),
            usable: usable.toLocaleString('en-US')
        };
    }

    cidrCalcBtn?.addEventListener('click', () => {
        const data = computeCidr(cidrInput.value);
        if (!data) {
            setCidrFields({});
            setToolAlert('CIDR Navigator: invalid CIDR format (example: 192.168.1.0/24).', 'error');
            return;
        }
        setCidrFields(data);
        setToolAlert('CIDR Navigator: range mapped successfully.', 'success');
    });

    cidrClearBtn?.addEventListener('click', () => {
        cidrInput.value = '';
        setCidrFields({});
        setToolAlert('CIDR Navigator: cleared.', 'success');
    });

    // URL
    const urlInput = root.querySelector('#url-input');
    const urlOutput = root.querySelector('#url-output');
    const urlEncodeBtn = root.querySelector('#url-encode-btn');
    const urlDecodeBtn = root.querySelector('#url-decode-btn');
    const urlClearBtn = root.querySelector('#url-clear-btn');

    urlEncodeBtn?.addEventListener('click', () => {
        if (!urlInput.value.trim()) {
            setToolAlert('URL Encoder: input is empty.', 'error');
            return;
        }
        urlOutput.value = encodeURIComponent(urlInput.value);
        setToolAlert('URL Encoder: encoded successfully.', 'success');
    });

    urlDecodeBtn?.addEventListener('click', () => {
        if (!urlInput.value.trim()) {
            setToolAlert('URL Encoder: input is empty.', 'error');
            return;
        }
        try {
            urlOutput.value = decodeURIComponent(urlInput.value.replace(/\+/g, '%20'));
            setToolAlert('URL Encoder: decoded successfully.', 'success');
        } catch {
            setToolAlert('URL Encoder: invalid URL encoding.', 'error');
        }
    });

    urlClearBtn?.addEventListener('click', () => {
        urlInput.value = '';
        urlOutput.value = '';
        setToolAlert('URL Encoder: cleared.', 'success');
    });

    activateUtility('tool-base64', false);
    setToolAlert('Utilities runtime loaded and ready.', 'success');

    return {
        activateUtility,
        destroy() {
            root.innerHTML = '';
        }
    };
}
