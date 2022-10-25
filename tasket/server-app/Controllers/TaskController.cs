using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using server_app.Models.EDM;

namespace server_app.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ILogger<TaskController> _logger;

        public TaskController(ILogger<TaskController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<t_task> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new t_task
            {
                id_task = Guid.NewGuid(),
                title = "item_" + index.ToString(),
                is_finish = true,
                end_date_scheduled = DateTime.Now.AddDays(index)
            })
            .ToArray();
        }
    }
}
