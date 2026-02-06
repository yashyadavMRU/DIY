<script>
  import { goto } from "$app/navigation";
</script>

<footer class="footer">
  <div class="container inner">
    <div class="footer-section brand-info">
      <div class="logo-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
        <span class="brand-name">Drone<span>Hub</span></span>
      </div>
      <p class="muted">
        The ultimate hangar for drone enthusiasts. Build, shop, and fly with the best community in the world.
      </p>
      <div class="social-links">
        <a href="https://twitter.com" target="_blank" aria-label="Follow us on Twitter"><i class="ri-twitter-x-fill"></i></a>
        <a href="https://youtube.com" target="_blank" aria-label="Subscribe to our YouTube channel"><i class="ri-youtube-fill"></i></a>
        <a href="https://github.com" target="_blank" aria-label="View our projects on GitHub"><i class="ri-github-fill"></i></a>
        <a href="https://discord.com" target="_blank" aria-label="Join our Discord community"><i class="ri-discord-fill"></i></a>
      </div>
    </div>

    <div class="footer-section">
      <h4>
        Navigation
      </h4>
      <ul>
        <li><button on:click={() => goto('/')}>Home</button></li>
        <li><button on:click={() => goto('/shop')}>Shop</button></li>
        <li><button on:click={() => goto('/builder')}>DIY Builder</button></li>
        <li><button on:click={() => goto('/tutorials')}>Tutorials</button></li>
      </ul>
    </div>

    <div class="footer-section  contact-info">
      <h4>Contact Us</h4>
      <p><i class="ri-map-pin-2-line"></i> 123 Skyway Drive, Flight City, FL 33012</p>
      <p><i class="ri-mail-line"></i> support@dronehub.com</p>
      <p><i class="ri-phone-line"></i> +1 (555) DRONE-HUB</p>
    </div>
  </div>

  <div class="footer-bottom">
    <p>&copy; 2026 DroneHub. Clear skies and happy flying.</p>
  </div>
</footer>

<style>
  .footer{
    background: #0f172a;
    border-top: 1px solid #1e293b;
    padding: 60px 0 20px;
    margin-top: 80px;
    color: #f8fafc;
  }

  .inner{
    display: grid;
    grid-template-columns: 1.5fr 1fr 1.2fr;
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
    text-align: left;
  }

  .footer-section h4{
    color: #38bdf8;
    margin-bottom: 20px;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .logo-wrap{
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
  }

  .logo-icon{
    width: 24px;
    color: #38bdf8;
  }

  .brand-name{
    font-weight: 800;
    font-size: 20px;
  }

  .brand-name span{
    color: #38bdf8;
  }

  .muted{
    color: #94a3b8;
    font-size: 14px;
    line-height: 1.6;
    max-width: 300px;
  }

  .social-links{
    display: flex;
    gap: 15px;
    margin-top: 20px;
  }

  .social-links a{
    color: #94a3b8;
    font-size: 20px;
    transition: 0.3s;
  }

  .social-links a:hover{
    color: #38bdf8;
    transform: translateY(-3px);
  }

  .footer-section ul{
    list-style: none;
    padding: 0;
  }

  .footer-section ul li{
    margin-bottom: 10px;
  }

  .footer-section ul li button{
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    font-size: 14px;
    padding: 0;
    transition: 0.2s;
  }

  .footer-section ul li button:hover {
    color: #38bdf8;
    padding-left: 5px;
  }

  /* Contact Info */
  .contact-info p {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    color: #94a3b8;
    font-size: 14px;
    margin-bottom: 15px;
  }

  .contact-info i {
    color: #38bdf8;
  }

  /* Bottom Bar */
  .footer-bottom {
    text-align: center;
    border-top: 1px solid #1e293b;
    margin-top: 40px;
    padding-top: 20px;
    color: #64748b;
    font-size: 12px;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .inner {
      grid-template-columns: 1fr;
      text-align: center;
      gap: 40px;
    }

    .muted, .brand-info {
      margin: 0 auto;
    }

    .social-links {
      justify-content: center;
    }

    .contact-info p {
      justify-content: center;
    }
  }
</style>