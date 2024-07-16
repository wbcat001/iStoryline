using Nancy;
using SQLitePCL;

namespace StorylineBackend.modules
{
    public class AppModule: NancyModule
    {
        public AppModule()
        {
            Get("/", args => View["index"]);
            Get("/Vue", args => View["Vue"]);
            Get("/Plotly", args => View["Plotly"]);

            // Get["/Vue"] = _ => View["Vue"];
        }
    }
}