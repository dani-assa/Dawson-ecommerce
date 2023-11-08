const footer = document.querySelector('footer');

const footer1 = () => {
  return (footer.innerHTML = `
  <div class="container">
  <footer class="d-flex flex-column d-lg-flex flex-lg-row justify-content-center justify-content-lg-between align-items-center py-3 my-4 border-top">
    <div class="col-md-4 d-flex align-items-center">
      <span class="mb-3 mb-md-0 text-body-secondary">© 2023 Dawson, Inc</span>
    </div>
      <ul class="list-unstyled d-flex align-items-center mt-lg-3">
        <li class="me-3 "><a class="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover opacity-75" href="#" onclick="window.location.pathname = './index.html'">Página principal</a></li>
        <li><a class="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover opacity-75" href="./views/nosotros.html">Sobre nosotros</a></li>
      </ul>
    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex ulIcons">
      <li class="ms-lg-3 liIcons"><a class="text-light iconRedes" href="#" onclick="window.location.pathname = '../views/error404.html'"><svg class="bi" width="24" height="24"><img id="logoTw" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAVlJREFUSEvlVUtug0AMtTVcoBKDlB05SdOTNJyk6UlKThJ6ks4uUgYpF5joVaZA+czwiZRVvALG42c/PxumBxs/OD49KYC1dsdEHwSkQjGYj1rrw/V8Tl0U7eW5ob5HUWntSTmXvWw2JtSb8nLZE/PX6BwwxJwSkMVJkocAQIBpMvKBlNYiKAwBISrq+4X4tRVIebco+mkug+gzci7vVhPMvoMIojetdRW8ByAvQhER7Vr/v7INAUcwGxbOffS0WSGPkyTrVtjvgfArzRMu7zFMAAwpuif+sMHzFK1EUc5thwrsUVRVodTpXopirUebYfShGiLgnZilH8ttoH+viiolhQZpCgowcZJsfS7eZWetPVSrYKENtR+Uafeg2SuzQAFqghRJYDm8KSXzMNmHqcxHACsVVMwtRW8FNYisitd6M/5PNLMB0fdwP8216Un/aHO0LJLpmiBTvr/lIqkZieUtLwAAAABJRU5ErkJggg=="/></use></svg></a></li>
      <li class="ms-3 liIcons"><a class="text-body-secondary iconRedes" href="#" onclick="window.location.pathname = '../views/error404.html'"><svg class="bi" width="24" height="24"><img id="logoInsta" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAcBJREFUSEvFVUtuwjAUnBfnApXsSKwIJwE23fcAleAkgNR7AMfoCnoS0i6KiCNV3Sd9lUMcOR/SoArBDsV+M+/NvDHhxj+6cX3cB+DreAxT358RMAYwudglc1R824ssWz0MBvZ/eaXRQRLHMxCt8xPnAvvOMRKFOQnmiIm2Sqmle74CYJhnvn8wRaVS07765PeE2OWciOZKqZJUBSCJ4zWIZiJNR23t1gGTJHkm5tUP8O2n6VMbuTrAAURRG3szOiYKiXkI4E0GweZ0Oj0Kz3sF8CGVGiZa512496sAWjOYNzII5pZtMTajSVVs5oiAlwz49DwvkFJucwDmUAbByN7/E6BgNWFgZQR0HLYwwrrF7IilUmXdTgDrKFvc1cD5NrWi9gJwi3WJbh3Xdr6zA/eC1npJwOKSqxKt+b8AEwJ2bSOy4GCeG0eZ8fUakeui0kHMod3Sisi1hbwawLDqsqnIsqm7kH0AGotSgghh9mDMRO90tmc+lpqzGovajApgUmfWJ5PKHKstanvYMUfXgLhjZKDcC0Psclw7Wd8rrs/xXjqqNSoq+SPEAjbruxCKN6NwWePtuM+T2UfUvmdu3sEv+6BYKHDxupkAAAAASUVORK5CYII="/></use></svg></a></li>
      <li class="ms-3 liIcons"><a class="text-body-secondary iconRedes" href="#" onclick="window.location.pathname = '../views/error404.html'"><svg class="bi" width="24" height="24"><img id="logoMeta" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAYhJREFUSEvtVUFuwjAQnBX5QKU4EqfSlxB+Ai8pfQnpS+AnpCekOBIfAG21JnbXjkuqStzwce3d2Z0Z24QHL3pwfTwBJhn+laLz6bS4FMWamF+Z6NMYc9DVpvb92RGAJF6LYgeg1gUZ+DDGbCVmra0J2EftM7ez63X1Mp+3Oj4C6K2VxBrMrXROwDKAMTdDbO/3i8ulcZMC7xJLQSKAvut2IFrLwbKq3nwnfdetQSRThcXAStNmrd0OIE1ZVZssRX3XHUG0APOmrKpGF4xAMvuO2tnM0aabCxPoAqUxI+oi3pMJfSN+Cq2XBnD06M1kgtt0fjFHVEh4MMgRwKE0ZiUxDXCPngBOzK3T42aCjdYhAKgJRwAZ8W6WHJIiG2eo6q1lbZIfANkAkAJ44XVc65FS6s97HTWA93/gNtwJxWkqqPa+0gAjgOBjNwaLRevBstkbmlIlwqqc0GSYIPtEZIRM3yPn/dhd0SWN/D5cFnmDlkz05d+ee0/mVM7zw/n/hzOZ+ccDD9fgG3P1LiiFInsiAAAAAElFTkSuQmCC"/></svg></a></li>
    </ul>
  </footer>
</div>
  `)
};

export default footer1;