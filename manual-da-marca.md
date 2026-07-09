<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>RITERO — Manual de Marca (de Feeling)</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,500&family=Work+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root{
    --preto: #1C1712;
    --creme: #F3E9D2;
    --creme-2: #FBF6EA;
    --cafe: #5B3A29;
    --terracota: #C17A4E;
    --rosa: #E3AFC0;
    --verde: #6E7F52;
    --line: rgba(28,23,18,0.14);
  }
  *{box-sizing:border-box; margin:0; padding:0;}
  html{scroll-behavior:smooth;}
  body{
    background:var(--creme-2);
    color:var(--preto);
    font-family:'Work Sans', sans-serif;
    font-weight:400;
    line-height:1.5;
  }
  .wrap{max-width:1080px; margin:0 auto; padding:0 40px;}
  section{padding:96px 0;}
  .eyebrow{
    font-family:'JetBrains Mono', monospace;
    font-size:12px;
    letter-spacing:0.14em;
    text-transform:uppercase;
    color:var(--cafe);
    display:flex;
    align-items:center;
    gap:14px;
    margin-bottom:24px;
  }
  .eyebrow::before{content:''; width:28px; height:1px; background:var(--terracota);}
  h1,h2,h3{font-family:'Fraunces', serif; font-weight:600; letter-spacing:-0.01em;}

  /* HERO */
  .hero{
    min-height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    background:
      radial-gradient(circle at 82% 18%, rgba(227,175,192,0.35), transparent 45%),
      radial-gradient(circle at 8% 88%, rgba(110,127,82,0.18), transparent 50%),
      var(--creme);
    border-bottom:1px solid var(--line);
    position:relative;
    overflow:hidden;
  }
  .hero-ring{
    position:absolute;
    right:-140px; top:-140px;
    width:420px; height:420px;
    border-radius:50%;
    border:1.5px solid var(--rosa);
  }
  .hero-ring.b{right:-90px; top:-90px; width:340px; height:340px; border-color:var(--terracota); opacity:0.5;}
  .hero-mark{
    font-size:clamp(58px, 11vw, 148px);
    line-height:0.92;
    letter-spacing:-0.01em;
    font-weight:700;
  }
  .hero-tag{
    font-family:'Fraunces', serif;
    font-style:italic;
    font-weight:400;
    font-size:clamp(18px, 2.4vw, 26px);
    color:var(--cafe);
    margin-top:18px;
  }
  .hero-sub{
    margin-top:56px;
    max-width:540px;
    font-size:16px;
    color:rgba(28,23,18,0.72);
  }
  .hero-meta{
    margin-top:64px;
    display:flex;
    gap:48px;
    font-family:'JetBrains Mono', monospace;
    font-size:11px;
    letter-spacing:0.08em;
    text-transform:uppercase;
    color:var(--cafe);
  }

  /* INTRO / MOOD STATEMENT */
  .mood-statement{
    font-family:'Fraunces', serif;
    font-weight:500;
    font-size:clamp(24px, 3.4vw, 38px);
    line-height:1.28;
    max-width:820px;
  }
  .mood-statement em{
    font-style:italic;
    font-weight:400;
    color:var(--cafe);
  }
  .mood-words{
    margin-top:40px;
    display:flex;
    flex-wrap:wrap;
    gap:10px 12px;
  }
  .mood-word{
    font-family:'JetBrains Mono', monospace;
    font-size:12px;
    letter-spacing:0.04em;
    padding:8px 16px;
    border:1px solid var(--line);
    border-radius:100px;
    color:var(--cafe);
  }

  /* COLOR */
  .color-grid{
    display:grid;
    grid-template-columns:repeat(3, 1fr);
    gap:1px;
    background:var(--line);
    border:1px solid var(--line);
    margin-top:48px;
  }
  .swatch{
    background:var(--creme-2);
    padding:32px 24px 24px;
  }
  .swatch-fill{
    height:120px;
    border-radius:6px;
    margin-bottom:20px;
    border:1px solid var(--line);
  }
  .swatch-name{font-family:'Fraunces', serif; font-weight:600; font-size:18px; margin-bottom:4px;}
  .swatch-role{font-size:13px; color:rgba(28,23,18,0.6); margin-bottom:12px;}
  .swatch-hex{
    font-family:'JetBrains Mono', monospace;
    font-size:12px;
    letter-spacing:0.02em;
    color:var(--cafe);
    text-transform:uppercase;
  }
  .color-ratio{
    margin-top:40px;
    display:flex;
    height:20px;
    border-radius:100px;
    overflow:hidden;
    border:1px solid var(--line);
  }
  .color-ratio-note{
    margin-top:14px;
    font-family:'JetBrains Mono', monospace;
    font-size:11px;
    letter-spacing:0.06em;
    text-transform:uppercase;
    color:rgba(28,23,18,0.55);
  }

  /* TYPE */
  .type-block{
    padding:40px 0;
    border-top:1px solid var(--line);
  }
  .type-block:last-child{border-bottom:1px solid var(--line);}
  .type-label{
    display:flex;
    justify-content:space-between;
    align-items:baseline;
    margin-bottom:20px;
  }
  .type-label span:first-child{
    font-family:'JetBrains Mono', monospace;
    font-size:11px;
    letter-spacing:0.08em;
    text-transform:uppercase;
    color:var(--cafe);
  }
  .type-label span:last-child{
    font-family:'JetBrains Mono', monospace;
    font-size:11px;
    color:rgba(28,23,18,0.5);
  }
  .type-sample-1{font-family:'Fraunces', serif; font-weight:700; font-size:clamp(36px,5vw,64px); letter-spacing:-0.01em;}
  .type-sample-2{font-family:'Fraunces', serif; font-style:italic; font-weight:400; font-size:clamp(24px,3vw,34px); color:var(--cafe);}
  .type-sample-3{font-family:'Work Sans', sans-serif; font-weight:500; font-size:16px; max-width:640px; color:rgba(28,23,18,0.8);}
  .type-sample-4{font-family:'JetBrains Mono', monospace; font-size:13px; letter-spacing:0.06em; text-transform:uppercase; color:var(--preto);}

  /* SPACING / WHITESPACE */
  .space-demo{
    margin-top:48px;
    border:1px solid var(--line);
    background:var(--creme-2);
  }
  .space-row{
    display:flex;
    align-items:center;
    border-bottom:1px solid var(--line);
  }
  .space-row:last-child{border-bottom:none;}
  .space-label{
    width:180px;
    padding:20px 24px;
    font-family:'JetBrains Mono', monospace;
    font-size:12px;
    color:var(--cafe);
    flex-shrink:0;
    border-right:1px solid var(--line);
  }
  .space-bar-track{flex:1; padding:20px 24px; display:flex; align-items:center;}
  .space-bar{height:8px; background:var(--terracota); border-radius:2px;}

  .white-mode-panel{
    margin-top:48px;
    display:grid;
    grid-template-columns:1.3fr 1fr;
    border:1px solid var(--line);
  }
  .wm-visual{
    background:var(--creme-2);
    padding:56px 48px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:18px;
    border-right:1px solid var(--line);
  }
  .wm-visual .card{
    background:#fff;
    border:1px solid var(--line);
    border-radius:4px;
    padding:28px 30px;
  }
  .wm-visual .card .k{font-family:'Fraunces',serif; font-weight:600; font-size:20px;}
  .wm-visual .card .v{font-size:13px; color:rgba(28,23,18,0.55); margin-top:6px;}
  .wm-notes{padding:32px 36px; display:flex; flex-direction:column; gap:22px;}
  .wm-note .n{font-family:'JetBrains Mono', monospace; font-size:11px; color:var(--terracota); margin-bottom:4px;}
  .wm-note .d{font-size:14px; color:rgba(28,23,18,0.78); line-height:1.55;}

  /* LOGO */
  .logo-grid{margin-top:48px; display:grid; grid-template-columns:1fr 1fr; gap:1px; background:var(--line); border:1px solid var(--line);}
  .logo-tile{background:var(--creme-2); padding:64px 40px; display:flex; align-items:center; justify-content:center; text-align:center; position:relative;}
  .logo-tile.dark{background:var(--preto);}
  .logo-tile.dark .lm{color:var(--creme-2);}
  .lm{font-family:'Fraunces', serif; font-weight:700; font-size:38px; letter-spacing:0.01em;}
  .clearspace-box{position:relative; padding:44px;}
  .clearspace-box::before{
    content:'';
    position:absolute; inset:0;
    border:1px dashed var(--rosa);
    margin:0;
  }
  .dont-tile{position:relative;}
  .dont-tile::after{
    content:'✕';
    position:absolute; top:16px; right:20px;
    font-family:'JetBrains Mono', monospace;
    color:var(--terracota);
    font-size:16px;
  }
  .logo-caption{
    font-family:'JetBrains Mono', monospace;
    font-size:10.5px;
    letter-spacing:0.06em;
    text-transform:uppercase;
    color:var(--cafe);
    position:absolute;
    bottom:16px; left:0; right:0;
    text-align:center;
  }

  /* PHOTOGRAPHY MOOD */
  .photo-grid{
    margin-top:48px;
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:14px;
  }
  .photo-tile{
    aspect-ratio:3/4;
    border-radius:6px;
    border:1px solid var(--line);
    display:flex;
    align-items:flex-end;
    padding:16px;
  }
  .photo-tile span{
    font-family:'JetBrains Mono', monospace;
    font-size:10.5px;
    letter-spacing:0.04em;
    text-transform:uppercase;
  }
  .pt1{background:linear-gradient(155deg,#e8dcc0,#c9a875);}
  .pt2{background:linear-gradient(155deg,#4a3222,#231a12); color:#F3E9D2;}
  .pt2 span{color:#F3E9D2;}
  .pt3{background:linear-gradient(155deg,#e3aFC0aa,#F3E9D2);}
  .pt4{background:linear-gradient(155deg,#6E7F52,#3f4a2e); color:#F3E9D2;}
  .pt4 span{color:#F3E9D2;}

  /* VOICE */
  .voice-grid{margin-top:48px; display:grid; grid-template-columns:1fr 1fr; gap:40px;}
  .voice-col .h{font-family:'JetBrains Mono', monospace; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:16px;}
  .voice-col.is .h{color:var(--verde);}
  .voice-col.isnt .h{color:var(--terracota);}
  .voice-col ul{list-style:none;}
  .voice-col li{
    font-family:'Fraunces', serif;
    font-size:17px;
    padding:14px 0;
    border-top:1px solid var(--line);
  }
  .voice-col li:last-child{border-bottom:1px solid var(--line);}

  <footer>
    <div class="wrap" style="width:100%; display:flex; justify-content:space-between; align-items:center;">
      <span>Ritero · Cafés Especiais</span>
      <span>Manual de feeling — não substitui um brandbook formal</span>
    </div>
  </footer>

</body>
</html>
