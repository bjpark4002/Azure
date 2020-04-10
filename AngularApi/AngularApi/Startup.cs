﻿using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using System.Web.Http.Cors;
[assembly: OwinStartup(typeof(AngularApi.Startup))]

namespace AngularApi
{
    public partial class Startup
    {

        public void Configuration(IAppBuilder app)
        {
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            ConfigureAuth(app);

        }
    }
}
