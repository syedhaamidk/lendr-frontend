import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');`;

const css = `
* { box-sizing:border-box; margin:0; padding:0; }
@keyframes fadeUp { from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);} }
@keyframes fadeIn { from{opacity:0;}to{opacity:1;} }
@keyframes blink { 0%,100%{opacity:1;}50%{opacity:0.3;} }
body { font-family:'DM Mono',monospace; background:#f5f2ee; color:#1a1a1a; }
.app { min-height:100vh; display:flex; align-items:center; justify-content:center; padding:32px 20px; }
.wrap { width:100%; max-width:400px; animation:fadeUp 0.5s ease both; }
.wrap-wide { width:100%; max-width:480px; animation:fadeUp 0.5s ease both; }
.logo { font-family:'DM Serif Display',serif; font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:#aaa; margin-bottom:52px; }
.eyebrow { font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:#c09a3a; margin-bottom:10px; }
.heading { font-family:'DM Serif Display',serif; font-size:clamp(26px,5vw,38px); line-height:1.15; margin-bottom:10px; }
.heading em { font-style:italic; color:#c09a3a; }
.sub { font-size:11px; color:#999; line-height:1.75; margin-bottom:36px; letter-spacing:0.03em; }
.badge { display:inline-block; font-size:10px; letter-spacing:0.14em; text-transform:uppercase; color:#c09a3a; border:1px solid #e5cc80; padding:5px 12px; margin-bottom:28px; animation:blink 2.8s ease infinite; }
.btn { display:block; width:100%; font-family:'DM Mono',monospace; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; padding:15px 24px; border:none; cursor:pointer; transition:background 0.18s,transform 0.15s,color 0.18s; text-align:center; }
.btn:active{transform:scale(0.98);}
.btn-dark { background:#1a1a1a; color:#f5f2ee; margin-bottom:10px; }
.btn-dark:hover { background:#c09a3a; }
.btn-dark:disabled { background:#ccc; cursor:not-allowed; }
.btn-outline { background:transparent; color:#888; border:1px solid #ddd; }
.btn-outline:hover { border-color:#1a1a1a; color:#1a1a1a; }
.field { margin-bottom:22px; }
.field label { display:block; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:#aaa; margin-bottom:8px; }
.field input { width:100%; background:transparent; border:none; border-bottom:1.5px solid #ddd; padding:10px 0; font-family:'DM Mono',monospace; font-size:14px; color:#1a1a1a; outline:none; transition:border-color 0.2s; }
.field input:focus { border-bottom-color:#c09a3a; }
.field input::placeholder { color:#ccc; font-size:13px; }
.err { font-size:11px; color:#c0503a; margin-bottom:16px; padding:10px 14px; background:#fff3f1; border-left:3px solid #c0503a; letter-spacing:0.03em; animation:fadeIn 0.3s ease; }
.divider { height:1px; background:#e8e4de; margin:24px 0; }
.toggle { font-size:11px; color:#aaa; text-align:center; margin-top:20px; letter-spacing:0.03em; }
.toggle span { color:#1a1a1a; cursor:pointer; border-bottom:1px solid #1a1a1a; padding-bottom:1px; }
.toggle span:hover { color:#c09a3a; border-color:#c09a3a; }
.back { font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:#bbb; cursor:pointer; display:inline-block; margin-bottom:36px; transition:color 0.2s; }
.back:hover { color:#1a1a1a; }
.check-email { text-align:center; }
.email-icon { font-size:48px; margin-bottom:24px; display:block; }
.email-addr { display:inline-block; background:#1a1a1a; color:#f5f2ee; font-size:12px; padding:6px 14px; margin:12px 0 28px; letter-spacing:0.06em; }
.preview-card { background:#1a1a1a; color:#f5f2ee; padding:26px; margin:28px 0; position:relative; }
.preview-card::after { content:'PREVIEW'; position:absolute; top:14px; right:16px; font-size:9px; letter-spacing:0.2em; color:#444; }
.preview-label { font-size:9px; letter-spacing:0.2em; color:#666; text-transform:uppercase; margin-bottom:12px; }
.preview-msg { font-size:13px; line-height:1.75; color:#ddd; }
.preview-msg strong { color:#fff; }
.preview-msg .amt { color:#c09a3a; }
.preview-footer { margin-top:16px; padding-top:14px; border-top:1px solid #333; display:flex; justify-content:space-between; font-size:10px; color:#555; }
.feature { display:flex; align-items:center; gap:12px; margin-bottom:12px; }
.feature-dot { width:5px; height:5px; border-radius:50%; background:#c09a3a; flex-shrink:0; }
.feature-text { font-size:11px; color:#666; letter-spacing:0.04em; }
.dash-header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:32px; }
.dash-email { font-size:10px; color:#aaa; letter-spacing:0.08em; }
.loan-card { border:1px solid #e8e4de; background:#fff; padding:20px; margin-bottom:10px; animation:fadeUp 0.4s ease both; transition:border-color 0.2s,transform 0.2s; }
.loan-card:hover { border-color:#1a1a1a; transform:translateY(-1px); }
.loan-row { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px; }
.loan-name { font-size:14px; letter-spacing:0.04em; }
.loan-amount { font-family:'DM Serif Display',serif; font-size:20px; color:#c09a3a; }
.loan-meta { font-size:10px; color:#bbb; letter-spacing:0.07em; margin-top:4px; }
.status-dot { display:inline-block; width:6px; height:6px; border-radius:50%; margin-right:5px; vertical-align:middle; }
.actions { display:flex; gap:8px; flex-wrap:wrap; margin-top:14px; }
.act-btn { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:0.1em; text-transform:uppercase; padding:8px 14px; border:1px solid #e8e4de; background:transparent; cursor:pointer; color:#888; transition:all 0.18s; }
.act-btn:hover { background:#1a1a1a; color:white; border-color:#1a1a1a; }
.act-btn:disabled { opacity:0.5; cursor:not-allowed; }
.act-btn.primary { background:#1a1a1a; color:white; border-color:#1a1a1a; }
.act-btn.primary:hover { background:#c09a3a; border-color:#c09a3a; }
.act-btn.verified { background:#2a6a2a; color:white; border-color:#2a6a2a; cursor:default; }
.act-btn.verified:hover { background:#2a6a2a; border-color:#2a6a2a; }
.add-btn { width:100%; border:1.5px dashed #ddd; background:transparent; padding:16px; font-family:'DM Mono',monospace; font-size:11px; letter-spacing:0.1em; color:#ccc; cursor:pointer; text-transform:uppercase; transition:all 0.2s; margin-top:4px; }
.add-btn:hover { border-color:#1a1a1a; color:#1a1a1a; }
.toast { position:fixed; bottom:28px; left:50%; transform:translateX(-50%); background:#1a1a1a; color:#f5f2ee; font-size:11px; letter-spacing:0.08em; padding:12px 24px; animation:fadeUp 0.3s ease; white-space:nowrap; z-index:100; }
.toast.ok { background:#2a6a2a; }
.toast.err { background:#9a2a2a; }
.results-row { display:flex; gap:8px; margin-top:10px; flex-wrap:wrap; }
.result-chip { font-size:10px; letter-spacing:0.08em; padding:4px 10px; }
.chip-sent { background:#e6f4e6; color:#2a6a2a; }
.chip-failed { background:#f4e6e6; color:#9a2a2a; }
.chip-skipped { background:#f0f0f0; color:#aaa; }
.otp-wrap { display:flex; gap:8px; margin-top:8px; }
.otp-input { flex:1; background:transparent; border:none; border-bottom:1.5px solid #ddd; padding:10px 0; font-family:'DM Mono',monospace; font-size:20px; letter-spacing:0.3em; color:#1a1a1a; outline:none; text-align:center; transition:border-color 0.2s; }
.otp-input:focus { border-bottom-color:#c09a3a; }
.verify-box { background:#fffbf0; border:1px solid #e5cc80; padding:16px; margin-top:12px; animation:fadeIn 0.3s ease; }
.verify-box-title { font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:#c09a3a; margin-bottom:10px; }
`;

const FEATURES = ["Unlimited loan entries","Real SMS & WhatsApp reminders","Email reminders","Recurring schedules","Payment tracking"];

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [authMode, setAuthMode] = useState("signup");
  const [trialForm, setTrialForm] = useState({ name:"", amount:"", phone:"", email:"", dueDate:"" });
  const [authForm, setAuthForm] = useState({ name:"", email:"", password:"" });
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ msg:"", type:"" });
  const [userEmail, setUserEmail] = useState("");
  const [sending, setSending] = useState(null);
  const [verifying, setVerifying] = useState(null); // loan id being verified
  const [otpSent, setOtpSent] = useState({}); // { [loanId]: true }
  const [otpCode, setOtpCode] = useState({});  // { [loanId]: "123456" }
  const [verified, setVerified] = useState({}); // { [phone]: true }
  const [loans, setLoans] = useState([
    { id:1, name:"Rahul S.", amount:"8000", phone:"+919876543210", email:"rahul@example.com", dueDate:"2026-03-10", status:"pending" },
    { id:2, name:"Priya M.", amount:"2500", phone:"+919765432109", email:"priya@example.com", dueDate:"2026-03-05", status:"sent" },
  ]);

  const toast$ = (msg, type="ok") => { setToast({msg,type}); setTimeout(()=>setToast({msg:"",type:""}),3200); };
  const clearErr = () => setError("");

  const handleAuth = () => {
    clearErr();
    const { name, email, password } = authForm;
    if (authMode==="signup" && !name.trim()) return setError("Please enter your full name.");
    if (!email.trim()) return setError("Please enter your email address.");
    if (!/\S+@\S+\.\S+/.test(email)) return setError("Enter a valid email.");
    if (!password) return setError("Please enter a password.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    setUserEmail(email);
    authMode==="signup" ? setScreen("check-email") : (finalize(), toast$("Welcome back!"));
  };

  const finalize = () => {
    if (trialForm.name && trialForm.amount) {
      setLoans(prev => [{ id:Date.now(), ...trialForm, status:"pending" }, ...prev]);
    }
    setScreen("dashboard");
  };

  const sendOtp = async (loan) => {
    setVerifying(loan.id);
    try {
      const res = await fetch(`${API_URL}/api/reminders/verify/send`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ phone: loan.phone })
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(prev => ({...prev, [loan.id]: true}));
        toast$(`Code sent to ${loan.phone} ✓`);
      } else {
        toast$(data.error || "Failed to send code", "err");
      }
    } catch {
      toast$("Could not reach backend", "err");
    }
    setVerifying(null);
  };

  const checkOtp = async (loan) => {
    const code = otpCode[loan.id];
    if (!code || code.length < 4) return toast$("Enter the code first", "err");
    setVerifying(loan.id);
    try {
      const res = await fetch(`${API_URL}/api/reminders/verify/check`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ phone: loan.phone, code })
      });
      const data = await res.json();
      if (data.verified) {
        setVerified(prev => ({...prev, [loan.phone]: true}));
        setOtpSent(prev => ({...prev, [loan.id]: false}));
        toast$(`${loan.phone} verified ✓ You can now send reminders!`);
      } else {
        toast$(data.error || "Wrong code, try again", "err");
      }
    } catch {
      toast$("Could not reach backend", "err");
    }
    setVerifying(null);
  };

  const sendReminder = async (loan) => {
    setSending(loan.id);
    try {
      const res = await fetch(`${API_URL}/api/reminders/send`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ name:loan.name, amount:loan.amount, phone:loan.phone, email:loan.email, dueDate:loan.dueDate })
      });
      const data = await res.json();
      if (data.success) {
        setLoans(prev => prev.map(l => l.id===loan.id ? {...l, status:"sent", results:data.results} : l));
        toast$(`Reminder sent to ${loan.name} ✓`);
      } else {
        setLoans(prev => prev.map(l => l.id===loan.id ? {...l, results:data.results} : l));
        toast$("Some channels failed", "err");
      }
    } catch { toast$("Could not reach backend", "err"); }
    setSending(null);
  };

  const dueLabel = (d) => {
    if (!d) return "the due date";
    return new Date(d).toLocaleDateString("en-IN", {day:"numeric",month:"long",year:"numeric"});
  };

  return (
    <>
      <style>{FONT+css}</style>
      <div className="app">

        {screen==="landing" && (
          <div className="wrap">
            <div className="logo">Lendr</div>
            <div className="badge">1 free trial — no signup needed</div>
            <h1 className="heading">Remind people<br/>what they <em>owe</em> you.</h1>
            <p className="sub">Track loans and send polite reminders via SMS, WhatsApp & Email.</p>
            <button className="btn btn-dark" onClick={()=>setScreen("trial")}>Try it free →</button>
            <button className="btn btn-outline" onClick={()=>{setAuthMode("login");clearErr();setScreen("auth");}}>Sign in</button>
          </div>
        )}

        {screen==="trial" && (
          <div className="wrap">
            <span className="back" onClick={()=>setScreen("landing")}>← Back</span>
            <div className="eyebrow">Free trial</div>
            <h2 className="heading">Add a loan entry</h2>
            <p className="sub">No account needed yet.</p>
            <div className="field"><label>Borrower's name</label><input placeholder="e.g. Rahul" value={trialForm.name} onChange={e=>setTrialForm({...trialForm,name:e.target.value})}/></div>
            <div className="field"><label>Amount (₹)</label><input type="number" placeholder="e.g. 5000" value={trialForm.amount} onChange={e=>setTrialForm({...trialForm,amount:e.target.value})}/></div>
            <div className="field"><label>Phone number</label><input placeholder="+91 98765 43210" value={trialForm.phone} onChange={e=>setTrialForm({...trialForm,phone:e.target.value})}/></div>
            <div className="field"><label>Email address</label><input type="email" placeholder="borrower@email.com" value={trialForm.email} onChange={e=>setTrialForm({...trialForm,email:e.target.value})}/></div>
            <div className="field"><label>Due date</label><input type="date" value={trialForm.dueDate} onChange={e=>setTrialForm({...trialForm,dueDate:e.target.value})}/></div>
            <button className="btn btn-dark" onClick={()=>{
              if (!trialForm.name||!trialForm.amount) return toast$("Please fill in name and amount.","err");
              setScreen("preview");
            }}>Preview reminder →</button>
          </div>
        )}

        {screen==="preview" && (
          <div className="wrap">
            <span className="back" onClick={()=>setScreen("trial")}>← Edit</span>
            <div className="eyebrow">Reminder preview</div>
            <h2 className="heading">Looks good?</h2>
            <div className="preview-card">
              <div className="preview-label">SMS / WhatsApp / Email</div>
              <p className="preview-msg">Hi <strong>{trialForm.name}</strong>, just a friendly reminder that you have a pending amount of <span className="amt">₹{trialForm.amount}</span> due by <strong>{dueLabel(trialForm.dueDate)}</strong>. Please let me know if you need any help. — Lendr</p>
              <div className="preview-footer"><span>{trialForm.phone||"No phone"}</span><span>{trialForm.email||"No email"}</span></div>
            </div>
            <button className="btn btn-dark" onClick={()=>setScreen("paywall")}>Send this reminder →</button>
          </div>
        )}

        {screen==="paywall" && (
          <div className="wrap">
            <div style={{textAlign:"center",marginBottom:32,fontSize:40}}>🔒</div>
            <div className="eyebrow" style={{textAlign:"center"}}>One more step</div>
            <h2 className="heading" style={{textAlign:"center"}}>Create a free account</h2>
            <p className="sub" style={{textAlign:"center"}}>Sign up to send real reminders.</p>
            <div className="divider"/>
            {FEATURES.map((f,i)=><div className="feature" key={i}><span className="feature-dot"/><span className="feature-text">{f}</span></div>)}
            <div className="divider"/>
            <button className="btn btn-dark" onClick={()=>{setAuthMode("signup");clearErr();setScreen("auth");}}>Create free account →</button>
            <button className="btn btn-outline" onClick={()=>{setAuthMode("login");clearErr();setScreen("auth");}}>Already have an account?</button>
          </div>
        )}

        {screen==="auth" && (
          <div className="wrap">
            <span className="back" onClick={()=>{clearErr();setScreen(authMode==="login"?"landing":"paywall");}}>← Back</span>
            <div className="eyebrow">{authMode==="signup"?"Sign up":"Sign in"}</div>
            <h2 className="heading">{authMode==="signup"?"Create your account":"Welcome back"}</h2>
            <p className="sub">{authMode==="signup"?"Free to start.":"Sign in to Lendr."}</p>
            {error && <div className="err">{error}</div>}
            {authMode==="signup" && <div className="field"><label>Full name</label><input placeholder="Your name" value={authForm.name} onChange={e=>{clearErr();setAuthForm({...authForm,name:e.target.value});}}/></div>}
            <div className="field"><label>Email</label><input type="email" placeholder="you@example.com" value={authForm.email} onChange={e=>{clearErr();setAuthForm({...authForm,email:e.target.value});}} onKeyDown={e=>e.key==="Enter"&&handleAuth()}/></div>
            <div className="field"><label>Password</label><input type="password" placeholder="Min. 6 characters" value={authForm.password} onChange={e=>{clearErr();setAuthForm({...authForm,password:e.target.value});}} onKeyDown={e=>e.key==="Enter"&&handleAuth()}/></div>
            <button className="btn btn-dark" style={{marginTop:8}} onClick={handleAuth}>{authMode==="signup"?"Create account →":"Sign in →"}</button>
            <div className="toggle">
              {authMode==="signup"
                ?<>Already have an account? <span onClick={()=>{setAuthMode("login");clearErr();}}>Sign in</span></>
                :<>No account? <span onClick={()=>{setAuthMode("signup");clearErr();}}>Sign up free</span></>}
            </div>
          </div>
        )}

        {screen==="check-email" && (
          <div className="wrap check-email">
            <span className="email-icon">📬</span>
            <div className="eyebrow">Almost there</div>
            <h2 className="heading">Check your inbox</h2>
            <p className="sub">We sent a confirmation link to</p>
            <div className="email-addr">{userEmail}</div>
            <p className="sub">Click the link to verify your account.</p>
            <button className="btn btn-dark" onClick={()=>{finalize();toast$("Welcome to Lendr 🎉");}}>✓ Simulate clicking email link</button>
            <button className="btn btn-outline" style={{marginTop:10}} onClick={()=>toast$("Email resent!")}>Resend email</button>
          </div>
        )}

        {screen==="dashboard" && (
          <div className="wrap-wide">
            <div className="dash-header">
              <div>
                <div className="eyebrow">Dashboard</div>
                <h2 className="heading" style={{fontSize:26,marginBottom:0}}>Your loans</h2>
              </div>
              <span className="dash-email">{userEmail||authForm.email}</span>
            </div>

            {loans.map((loan,i)=>(
              <div className="loan-card" key={loan.id} style={{animationDelay:`${i*0.07}s`}}>
                <div className="loan-row">
                  <div>
                    <div className="loan-name">{loan.name}</div>
                    <div className="loan-meta">
                      <span className="status-dot" style={{background:loan.status==="sent"?"#7ab87a":"#e8c97a"}}/>
                      {loan.status==="sent"?"Reminder sent":"Pending"} · Due {dueLabel(loan.dueDate)}
                    </div>
                    <div className="loan-meta" style={{marginTop:4}}>{loan.phone} · {loan.email}</div>
                  </div>
                  <div className="loan-amount">₹{loan.amount}</div>
                </div>

                {loan.results && (
                  <div className="results-row">
                    {Object.entries(loan.results).map(([ch,st])=>(
                      <span key={ch} className={`result-chip chip-${st}`}>{ch}: {st}</span>
                    ))}
                  </div>
                )}

                {/* OTP verify box */}
                {otpSent[loan.id] && (
                  <div className="verify-box">
                    <div className="verify-box-title">Enter the code sent to {loan.phone}</div>
                    <div className="otp-wrap">
                      <input className="otp-input" maxLength={6} placeholder="······" value={otpCode[loan.id]||""} onChange={e=>setOtpCode(prev=>({...prev,[loan.id]:e.target.value}))}/>
                      <button className="act-btn primary" disabled={verifying===loan.id} onClick={()=>checkOtp(loan)}>
                        {verifying===loan.id?"Checking…":"Confirm"}
                      </button>
                    </div>
                  </div>
                )}

                <div className="actions">
                  <button className="act-btn primary" disabled={sending===loan.id} onClick={()=>sendReminder(loan)}>
                    {sending===loan.id?"Sending…":loan.status==="sent"?"Resend":"Send reminder"}
                  </button>

                  {verified[loan.phone] ? (
                    <button className="act-btn verified">✓ Verified</button>
                  ) : (
                    <button className="act-btn" disabled={verifying===loan.id||otpSent[loan.id]} onClick={()=>sendOtp(loan)}>
                      {verifying===loan.id?"Sending code…":otpSent[loan.id]?"Code sent":"Verify number"}
                    </button>
                  )}

                  <button className="act-btn" onClick={()=>{setLoans(prev=>prev.filter(l=>l.id!==loan.id));toast$("Loan removed.");}}>Remove</button>
                </div>
              </div>
            ))}

            <button className="add-btn" onClick={()=>{setTrialForm({name:"",amount:"",phone:"",email:"",dueDate:""});setScreen("trial");}}>+ Add new loan</button>
          </div>
        )}

        {toast.msg && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
      </div>
    </>
  );
}
