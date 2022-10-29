using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using server_app.Models.EDM;

namespace server_app.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly DataContext _context;
        public TaskController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<t_task>>> Get()
        {
            return await _context.t_tasks.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<t_task>> Details(Guid id)
        {
            return await _context.t_tasks.FindAsync(id);
        }
    }
}